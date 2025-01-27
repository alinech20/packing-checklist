export const useTextUtils = () => {
  const capitalizeWord = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  const capitalizeEachWord = (str: string) => {
    return str
      .split(' ')
      .map((w) => capitalizeWord(w))
      .join(' ')
  }

  return {
    capitalizeWord,
    capitalizeEachWord,
  }
}
