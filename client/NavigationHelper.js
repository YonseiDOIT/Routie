export const resetToMain = (navigation, options = { keepLogin: true }) => {
  if (options.keepLogin) {
    // 로그인 화면을 스택에 유지한 채로 Main 화면으로 이동
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  }
};
