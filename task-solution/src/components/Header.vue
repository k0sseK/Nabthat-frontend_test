<template>
    <header class="header" role="banner">
        <nav class="header__logo-container">
            <a href="/" class="header__logo-link" aria-label="Home">
                <svg
                    class="header__logo-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -1 24 24"
                    fill="#fff"
                    role="img"
                    aria-labelledby="logoTitle logoDesc"
                >
                    <title id="logoTitle">Company Logo</title>
                    <desc id="logoDesc">A stylized logo of the company</desc>
                    <path
                        d="M3.1825,2.00012,4.78735,20.00079l7.20191,1.99933,7.22168-2.00207L20.8175,2.00012ZM17.32507,7.88739H8.87683l.20178,2.26074h8.04554l-.60584,6.778L12,18.17834v.00043l-.01013.00275L7.46753,16.92615,7.1582,13.45972H9.37439l.1571,1.76074,2.45874.66388.00208-.00049v-.00018l2.46228-.66461.25635-2.86323H7.05957L6.46411,5.67969h11.0586Z"
                    ></path>
                </svg>
            </a>
        </nav>
        <div class="header__title-container">
            <h1 class="header__title-text">Zadanie <strong>rekrutacyjne</strong></h1>
            <p class="header__title-author" v-if="visibleAuthor">Marcel Głód</p>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import eventBus from '../eventBus'

const visibleAuthor = ref<boolean>(false)

onMounted(() => {
    eventBus.on('showName', () => {
        visibleAuthor.value = true
    })

    eventBus.on('hideName', () => {
        visibleAuthor.value = false
    })
})

onBeforeUnmount(() => {
    eventBus.on('showName', () => {
        visibleAuthor.value = true
    })

    eventBus.on('hideName', () => {
        visibleAuthor.value = false
    })
})
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.header {
    background-color: $black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2em;
    height: 11vh;

    @media (max-width: 960px) {
        padding: 1rem;
        height: auto;
        align-items: center;
    }

    &__logo-container {
        display: flex;
        align-items: center;
        justify-content: center;

        .header__logo-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $dark-grey;
            border-radius: 50%;
            width: 4em;
            padding: 0.8em;
            cursor: pointer;

            transition: background-color 0.1s ease-in;

            &:hover {
                background-color: $orange;
            }
        }
    }

    &__title-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .header__title-text {
            font-size: 1.6em;
            color: $white;
            font-weight: 400;

            @media (max-width: 960px) {
                font-size: 1.2rem;
                margin-bottom: 0.25rem;
            }
        }

        .header__title-author {
            color: $white;
            text-align: right;
            width: 100%;
            font-size: 18px;
        }
    }
}
</style>
