<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goSimulation = () => {
  router.push("/home");
};
</script>

<template>
  <div class="landing">
    <div class="logo">TnEnergy</div>

    <div class="menu">
      <button class="pill" disabled>Local data</button>

     
      <button class="pill" @click="goSimulation">Simulation</button>

      <button class="pill" disabled>Dashboard</button>
      <button class="pill" disabled>Contents</button>
    </div>

    <div class="compete">
      <p>If you want to compete:</p>
      <div class="compete-buttons">
        <button class="pill yellow" disabled>Ranking</button>
        <button class="pill yellow" disabled>Challenges</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  background: linear-gradient(135deg, #2f6f2f, #3ab52a);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 26px;
  font-family: Arial, sans-serif;
  position: relative;
}

.logo {
  position: absolute;
  top: 30px;
  left: 30px;
  background: #e7f6e7;
  padding: 22px;
  border-radius: 50%;
  font-weight: bold;
  color: #2f6f2f;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: min(520px, 90vw);
  align-items: center;
}

.pill {
  width: 100%;
  max-width: 420px;
  padding: 14px 20px;
  border-radius: 999px;
  border: none;
  background: #e7f6e7;
  color: #2f6f2f;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.pill:hover {
  transform: translateY(-1px);
}

.pill:disabled {
  opacity: 0.75;
  cursor: not-allowed;
  transform: none;
}

.compete {
  margin-top: 6px;
  text-align: center;
  color: #e7f6e7;
}

.compete-buttons {
  display: flex;
  gap: 18px;
  margin-top: 10px;
  justify-content: center;
  width: min(520px, 90vw);
}

.yellow {
  background: #f6b300;
  color: #2b2b2b;
  max-width: 250px;
}
</style>
