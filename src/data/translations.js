export const TRANSLATIONS = {
  pt: {
    theory: 'Teoria',
    activity1: 'Atividade 1',
    activity2: 'Atividade 2',
    next: 'Avançar →',
    back: '← Voltar',
    finishPhase: 'Concluir Fase →',
    finishStudy: 'Ver Resultados →',
    choosePhase: 'Escolha sua próxima etapa',
    chooseDesc: 'Você completou as fases 1, 2 e 3. Agora escolha por qual fase continuar.',
    chooseDescSub: 'Após concluir a fase escolhida, você verá os resultados finais.',
    loading: 'Carregando...',
    results: 'Resultados Finais',
    step: 'Passo',
    of: 'de',
  },
  en: {
    theory: 'Theory',
    activity1: 'Activity 1',
    activity2: 'Activity 2',
    next: 'Next →',
    back: '← Back',
    finishPhase: 'Complete Phase →',
    finishStudy: 'View Results →',
    choosePhase: 'Choose your next step',
    chooseDesc: 'You have completed phases 1, 2, and 3. Now choose which phase to continue with.',
    chooseDescSub: 'After completing the chosen phase, you will see the final results.',
    loading: 'Loading...',
    results: 'Final Results',
    step: 'Step',
    of: 'of',
  },
  es: {
    theory: 'Teoría',
    activity1: 'Actividad 1',
    activity2: 'Actividad 2',
    next: 'Avanzar →',
    back: '← Volver',
    finishPhase: 'Completar Fase →',
    finishStudy: 'Ver Resultados →',
    choosePhase: 'Elija su próxima etapa',
    chooseDesc: 'Ha completado las fases 1, 2 y 3. Ahora elija con qué fase continuar.',
    chooseDescSub: 'Después de completar la fase elegida, verá los resultados finales.',
    loading: 'Cargando...',
    results: 'Resultados Finales',
    step: 'Paso',
    of: 'de',
  }
};

export function getBrowserLanguage() {
  if (typeof navigator === 'undefined') return 'pt';
  const lang = navigator.language || navigator.userLanguage || '';
  if (lang.startsWith('en')) return 'en';
  if (lang.startsWith('es')) return 'es';
  return 'pt';
}

export const t = (key) => {
  const lang = getBrowserLanguage();
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['pt'][key];
};
