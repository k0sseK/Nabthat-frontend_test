import { defineStore } from 'pinia'

interface ContentItem {
    id: string
    text: string
}

interface State {
    content: ContentItem[]
}

export const useContentStore = defineStore('content', {
    state: (): State => ({
        content: JSON.parse(localStorage.getItem('content') || '[]')
    }),

    actions: {
        setContent(content: ContentItem[]) {
            this.content = content
            localStorage.setItem('content', JSON.stringify(this.content))
        },

        addContent(item: ContentItem) {
            this.content.push(item)
            localStorage.setItem('content', JSON.stringify(this.content))
        },

        updateContent(updatedItem: ContentItem) {
            const index = this.content.findIndex((item) => item.id === updatedItem.id)
            if (index !== -1) {
                this.content.splice(index, 1, updatedItem)
                localStorage.setItem('content', JSON.stringify(this.content))
            }
        },

        removeContent(id: string) {
            this.content = this.content.filter((item) => item.id !== id)
            localStorage.setItem('content', JSON.stringify(this.content))
        },

        async loadContent() {
            const response = await fetch('src/assets/content.json')
            const data: ContentItem[] = await response.json()
            this.setContent(data)
        }
    },

    getters: {
        getContent: (state) => state.content
    }
})
