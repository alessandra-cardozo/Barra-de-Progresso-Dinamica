new Vue({
    el: "#app",
    data: {
      steps: [
        { label: "Etapa 1" },
        { label: "Etapa 2" },
        { label: "Etapa 3" },
        { label: "Concluído" }
      ],
      stepColors: ["#ff5733", "#33ff57", "#3357ff", "#ffd700"], // Cores para cada bolinha e barra
      currentStepIndex: 0,
      intervalId: null
    },
    computed: {
      currentStep() {
        return this.steps[this.currentStepIndex];
      },
      currentColor() {
        return this.stepColors[this.currentStepIndex];
      },
      progressClasses() {
        const progressPercentage = (this.currentStepIndex / (this.steps.length - 1)) * 100;
        return `width-${progressPercentage}`;
      }
    },
    methods: {
      stepClasses(index) {
        return {
          "progress__step--complete": index < this.currentStepIndex,
          "progress__step--active": index === this.currentStepIndex
        };
      },
      nextStep(forward = true) {
        if (forward && this.currentStepIndex < this.steps.length - 1) {
          this.currentStepIndex++;
        } else if (!forward && this.currentStepIndex > 0) {
          this.currentStepIndex--;
        }
      },
      startAutoProgress() {
        if (this.intervalId) return; // Evita múltiplos intervalos
        this.intervalId = setInterval(() => {
          if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
          } else {
            this.currentStepIndex = 0; // Reinicia ao concluir
          }
        }, 2000); // Intervalo de 2 segundos
      },
      stopAutoProgress() {
        clearInterval(this.intervalId);
        this.intervalId = null;
      },
      resetProgress() {
        this.stopAutoProgress(); // Para o intervalo
        this.currentStepIndex = 0; // Reinicia o progresso
      }
    }
  });
  