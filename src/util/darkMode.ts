

const userTheme = localStorage.getItem("theme")
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

console.log(userTheme)

const  switchToggle = () => {
    document.querySelector('.moon')?.classList.toggle('hidden')
    document.querySelector('.sun')?.classList.toggle('hidden')
} 
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
export const darkMode = () => {
   
    if (userTheme === 'dark' || (!userTheme && systemTheme )) {
        document.documentElement.classList.add('dark')
       
        document.querySelector('.moon')?.classList.add('hidden')
      } else {
        document.querySelector('.sun')?.classList.add('hidden')
      }
      
}

export const themeSwitch = () => {
    if(document.documentElement.classList.contains('dark')){
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        switchToggle()
        return
    }

    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    switchToggle()
    
}

