import { TagChip } from '../../components/ui/TagChip'

interface TagFilterProps {
  tags: string[]
  selected: string[]
  onToggle: (tag: string) => void
}

export function TagFilter({ tags, selected, onToggle }: TagFilterProps) {
  if (tags.length === 0) return null
  return (
    <div className="flex flex-wrap gap-xs mb-lg">
      {tags.map((tag) => (
        <TagChip
          key={tag}
          label={tag}
          active={selected.includes(tag)}
          onClick={() => onToggle(tag)}
        />
      ))}
    </div>
  )
}
