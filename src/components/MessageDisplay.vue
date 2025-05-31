<script setup lang="ts">
import { ref } from 'vue'
import { fetchMessage } from '../composables/useOpenAI'

const message = ref('')
const error = ref('')
const loading = ref(false)

const getMessage = async () => {
  loading.value = true
  message.value = ''
  error.value = ''
  try {
    const response = await fetchMessage()
    message.value = response
  } catch (e) {
    error.value = 'メッセージの読み込みに失敗しました'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="message-box">
    <button class="message-button" @click="getMessage" :disabled="loading">メッセージを表示</button>
    <p v-show="loading" class="loading-message">読み込み中...</p>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="message" class="message-text white-space-pre-line">{{ message }}</p>
  </div>
</template>
