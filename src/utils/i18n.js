export function generateTitle(title) {
  const haskey = this.$te('route.' + title)
  if (haskey) {
    const translatedTitle = this.$t('route.' + title)
    return translatedTitle
  }
  return title
}
