package com.specbook.resume;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.Map;

@Service
public class AIReviewService {

    private static final int DAILY_LIMIT = 20;
    private static final String CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

    @Value("${claude.api-key:}")
    private String apiKey;

    private final AiCallLogRepository logRepo;
    private final ObjectMapper mapper = new ObjectMapper();

    public AIReviewService(AiCallLogRepository logRepo) {
        this.logRepo = logRepo;
    }

    @Transactional
    public Map<String, String> review(String content) throws Exception {
        checkDailyLimit();

        String suggestion = callClaudeApi(content);
        recordCall();

        return Map.of("original", content, "suggestions", suggestion);
    }

    private void checkDailyLimit() {
        LocalDate today = LocalDate.now();
        logRepo.findByCallDate(today).ifPresent(log -> {
            if (log.getCallCount() >= DAILY_LIMIT) {
                throw new DailyLimitExceededException("일일 AI 점검 한도(" + DAILY_LIMIT + "회)에 도달했습니다.");
            }
        });
    }

    private void recordCall() {
        LocalDate today = LocalDate.now();
        AiCallLog log = logRepo.findByCallDate(today)
                .orElseGet(() -> logRepo.save(new AiCallLog(today)));
        log.increment();
        logRepo.save(log);
    }

    private String callClaudeApi(String content) throws Exception {
        String prompt = "다음 이력서 내용의 맞춤법과 문장을 개선해주세요. " +
                "원문을 유지하면서 더 자연스럽고 전문적인 표현으로 다듬어주세요:\n\n" + content;

        String body = mapper.writeValueAsString(Map.of(
                "model", "claude-sonnet-4-5",
                "max_tokens", 1024,
                "messages", new Object[]{
                        Map.of("role", "user", "content", prompt)
                }
        ));

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(CLAUDE_API_URL))
                .header("Content-Type", "application/json")
                .header("x-api-key", apiKey)
                .header("anthropic-version", "2023-06-01")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("Claude API error: " + response.statusCode() + " " + response.body());
        }

        JsonNode node = mapper.readTree(response.body());
        return node.at("/content/0/text").asText();
    }

    public static class DailyLimitExceededException extends RuntimeException {
        public DailyLimitExceededException(String message) { super(message); }
    }
}
