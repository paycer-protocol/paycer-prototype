export default function scrollHandler() {
    const header = document.getElementById('header')
    if (!header) {
        return null
    }

    if (window.pageYOffset === 0) {
        header.classList.remove('going-sticky')
        header.classList.remove('is-sticky')
    }

    if (window.pageYOffset > 1 && !header.classList.contains('is-sticky')) {
        header.classList.add('going-sticky')
    }

    if (window.pageYOffset > 500) {
        header.classList.remove('going-sticky')
        header.classList.add('is-sticky')
    }

    if (window.pageYOffset < 100) {
        clearAll()
    }
}

export const setActiveMenu = (sectionId) => {
    clearAll()

    const item = document.querySelector(`.anchor-${sectionId}`);

    if (item) {
        document.querySelector(`.anchor-${sectionId}`).classList.add('is--Active')
    }
}

export const clearAll = () => {
    Array.from(document.querySelectorAll('.anchor-link')).map((link) => {
        link.classList.remove('is--Active');
    })
}