<template>
    <main class="main">
        <h1 class="main__header">Nagłówek H1</h1>
        <div class="main__columns">
            <div class="main__columns__column">
                <div class="block">
                    <span class="block__title">BLOK PIERWSZY</span>
                    <div class="block__radio-list">
                        <label
                            class="block__radio-list__button"
                            :class="{
                                'block__radio-list__button--selected': selectedOption === 'first'
                            }"
                        >
                            <input
                                type="radio"
                                name="option"
                                value="first"
                                aria-label="Opcja pierwsza"
                                @change="selectOption"
                            />
                            Opcja pierwsza
                        </label>
                        <label
                            class="block__radio-list__button"
                            :class="{
                                'block__radio-list__button--selected': selectedOption === 'second'
                            }"
                        >
                            <input
                                type="radio"
                                name="option"
                                value="second"
                                aria-label="Opcja druga"
                                @change="selectOption"
                            />
                            Opcja druga
                        </label>
                        <label
                            class="block__radio-list__button"
                            :class="{
                                'block__radio-list__button--selected': selectedOption === 'random'
                            }"
                        >
                            <input
                                type="radio"
                                name="option"
                                value="random"
                                aria-label="Opcja losowa"
                                @change="selectOption"
                            />
                            Opcja losowa
                        </label>
                    </div>
                </div>
            </div>
            <div class="main__columns__column">
                <div class="block">
                    <span class="block__title">blok DRUGI</span>
                    <div class="block__buttons">
                        <div class="block__buttons__button" @click="replaceContent()">Zastąp</div>
                        <div class="block__buttons__button" @click="addContent()">Doklej</div>
                    </div>
                </div>
            </div>
            <div class="main__columns__column">
                <div class="block">
                    <span class="block__title block__title--short"
                        >BLOK Z DŁUGĄ NAZWĄ, KTÓRA SAMA SIĘ PRZYTNIE</span
                    >
                    <div class="block__content">
                        {{ blockContent.join(' ') }}
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import content from '../assets/content.json'

type ContentOption = 'first' | 'second' | 'random' | 'none'
const selectedOption = ref<ContentOption>('none')
const blockContent = ref<string[]>([])

interface ContentItem {
    text: string
}

const selectOption = (event: Event) => {
    const target = event.target as HTMLSelectElement
    selectedOption.value = target.value as ContentOption
}

const getContent = (): string => {
    const mapping: { [key in ContentOption]: () => string } = {
        first: () => content[0].text,
        second: () => content[1].text,
        random: () => {
            const unusedContent = content.filter(
                (item: ContentItem) => !blockContent.value.includes(item.text)
            )
            if (unusedContent.length === 0) {
                return 'Brak unikalnych treści do dodania.'
            }
            const randomIndex = Math.floor(Math.random() * unusedContent.length)
            return unusedContent[randomIndex].text
        },
        none: () => 'Proszę wybrać opcję!'
    }

    return mapping[selectedOption.value]?.() || 'Proszę wybrać opcję!'
}

const addContent = () => {
    const contentToAdd = getContent()
    if (
        contentToAdd === 'Proszę wybrać opcję!' ||
        contentToAdd === 'Brak unikalnych treści do dodania.'
    ) {
        alert(contentToAdd)
        return
    }

    blockContent.value.push(contentToAdd)
    blockContent.value.sort()
}

const replaceContent = () => {
    const contentToAdd = getContent()
    if (
        contentToAdd === 'Proszę wybrać opcję!' ||
        contentToAdd === 'Brak unikalnych treści do dodania.'
    ) {
        alert(contentToAdd)
        return
    }

    blockContent.value = [contentToAdd]
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem;
    min-height: 100vh;
    color: $white;

    @media (max-width: 960px) {
        padding: 1.6rem;
    }

    &__header {
        text-align: center;
        margin-bottom: 5vh;
        padding-bottom: 1rem;
        line-height: 1.5;
        position: relative;
        font-weight: $fw-400;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 0.5px;
            background-color: $white;
        }
    }

    &__columns {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 98vw;
        width: 100%;

        @media (max-width: 960px) {
            gap: 1rem;
        }

        &__column {
            flex: 2;
            min-width: 9rem;

            @media (max-width: 960px) {
                margin: 0 -0.6rem;
                &:nth-child(3) {
                    margin-top: 1rem;
                }
            }
        }
    }

    .block {
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 1.25rem;

        &__title {
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 3rem;

            &--short {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }

        &__radio-list {
            display: flex;
            flex-direction: column;

            &__button {
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                cursor: pointer;

                &--selected {
                    font-weight: $fw-700;
                }
            }

            &__button input[type='radio'] {
                appearance: none;
                background-color: $dark-grey;
                border: 2px solid $white;
                border-radius: 50%;
                width: 1.5rem;
                height: 1.5rem;
                cursor: pointer;
                position: relative;
                outline: none;
                margin-right: 1rem;

                &:checked::before {
                    content: '';
                    display: block;
                    width: 0.75rem;
                    height: 0.75rem;
                    background-color: $white;
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }

        &__buttons {
            display: flex;
            justify-content: center;
            flex-direction: row;
            gap: 2rem;

            @media (max-width: 960px) {
                flex-direction: column;
                gap: 1rem;
            }

            &__button {
                text-transform: uppercase;
                border: 1px solid $white;
                border-radius: 0.25rem;
                padding: 0.7rem 3.5rem;
                font-weight: $fw-700;
                color: $light-grey;
                transition: background-image 0.2s ease-in-out;

                @media (max-width: 960px) {
                    padding: 0;
                    text-align: center;
                    padding: 0.6rem;
                }

                &:hover {
                    cursor: pointer;
                    background-image: radial-gradient(circle at 50% 100%, $light-orange, $orange);
                    color: $white;
                }
            }
        }

        &__content {
            text-align: center;
            color: $light-grey;
            font-size: 14px;
        }
    }
}
</style>
