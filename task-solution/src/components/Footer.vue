<template>
    <footer class="footer">
        <div class="footer__left">
            <div class="footer__left-text">
                CSS <br />
                IS <br />
                AWESOME
                <div class="footer__left-box"></div>
            </div>
        </div>
        <div class="footer__center">
            <span class="footer__center-text"> nabthat </span>
        </div>
        <div class="footer__right">
            <div class="footer__dropdown">
                <button class="footer__button" @click="toggleMenu">
                    POKAŻ<span
                        class="arrow"
                        :class="{ 'arrow--expanded': visibleMenu }"
                        aria-hidden="true"
                        >&#10095;</span
                    >
                </button>
                <div
                    class="footer__popup-menu"
                    :class="{ 'footer__popup-menu--show': visibleMenu }"
                >
                    <ul class="footer__menu-list">
                        <li class="footer__menu-item">
                            <a href="#" @click="resetSettings"
                                ><span>&#10095;</span>ZRESETUJ USTAWIENIA</a
                            >
                        </li>
                        <li class="footer__menu-item">
                            <a href="#" @click="showName"
                                ><span>&#10095;</span>POKAZ DANE OSOBOWE</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import eventBus from '../eventBus'

const visibleMenu = ref<boolean>(false)

const toggleMenu = () => {
    visibleMenu.value = !visibleMenu.value
}

const closeMenu = () => {
    visibleMenu.value = false
}

const resetSettings = () => {
    eventBus.emit('hideName')
    closeMenu()
}

const showName = () => {
    eventBus.emit('showName')
    closeMenu()
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1em 4em;
    background-color: $very-dark-grey;
    z-index: 999;

    &__left {
        position: relative;
        font-family: 'Open Sans', sans-serif;
        font-weight: $fw-300;
        transition: border-color 0.3s;
        color: $dark-grey;
        width: 33%;

        &-text {
            position: relative;
            display: inline-block;
        }

        &-box {
            position: absolute;
            top: 0;
            right: 0.3rem;
            width: 100%;
            height: 100%;
            border: 0.01rem solid;
            box-sizing: border-box;
        }

        &:hover .footer__left-box {
            cursor: pointer;
            animation: rotate 1s linear 1;
            border: 0.125rem solid $orange;
        }
    }

    &__center {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 33%;
    }

    &__center-text {
        font-size: 1.5em;
        color: $dark-grey;
        display: flex;
        align-items: center;
        width: 40%;

        &::before,
        &::after {
            content: '';
            flex: 1;
            border-bottom: 0.0625rem solid $dark-grey;
            margin: 0 10px;
        }
    }

    &__right {
        text-align: right;
        width: 33%;

        .footer__dropdown {
            position: relative;
            display: inline-block;

            .footer__button {
                background-color: transparent;
                border: 0.0625rem solid #a4a8b3;
                color: #a4a8b3;
                padding: 1rem 5rem;
                font-weight: bold;
                cursor: pointer;
                border-radius: 0.25rem;
                font-family: 'Open Sans', sans-serif;
                .arrow {
                    margin-left: 1rem;
                    display: inline-block;
                    transform: rotate(270deg);
                    &--expanded,
                    &:hover .arrow,
                    &:focus .arrow {
                        transform: rotate(90deg);
                    }
                }
                &:hover {
                    color: white;
                }
            }

            .footer__popup-menu {
                display: none;
                position: absolute;
                bottom: calc(100% + 1.85rem);
                right: 0;
                background-color: #f9f9f9;
                z-index: 33;
                width: 100%;
                box-shadow:
                    0 -1rem 1rem rgba(0, 0, 0, 0.2),
                    1rem 0 1rem rgba(0, 0, 0, 0.2),
                    -1rem 0 1rem rgba(0, 0, 0, 0.2);
                &.footer__popup-menu--show {
                    display: block;
                }

                .footer__menu-list {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    font-family: 'Open Sans', sans-serif;

                    .footer__menu-item {
                        text-align: left;
                        margin: 1rem;

                        a {
                            text-decoration: none;
                            font-size: 85%;
                            color: #333;
                            display: block;

                            &:hover {
                                color: $orange;
                            }
                        }
                        a span {
                            margin-right: 0.5rem;
                        }
                    }
                }
            }
        }
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 960px) {
    .footer {
        align-items: center;

        .footer__center {
            display: none;
        }

        &__right {
            text-align: center;
            width: 50%;
            // padding: 1rem;
        }
    }
}
</style>
