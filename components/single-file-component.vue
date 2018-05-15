<template>
<div>
    {{ hello }}
</div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            hello: 'hello'
        }
    }
}
</script>

<style>
div {
    text-align: center;
}
</style>
