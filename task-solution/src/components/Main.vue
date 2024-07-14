<template>
    <main class="main">
        <h1 class="main__header">Nagłówek H1</h1>
        <div class="main__columns"></div>
    </main>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem;

    &__header {
        text-align: center;
        margin-bottom: 5vh;
        padding-bottom: 1rem;
        line-height: 1.5;
        position: relative;
        font-weight: $fw-300;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 0.5px;
            background-color: red;
        }
    }
}
</style>
