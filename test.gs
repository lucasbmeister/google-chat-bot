function myFunction() {
  let event = {
    space: {
      type: 'DM'
    },
    message: {
      text: '/salvar teste123',
      slashCommand: {
        commandId: 1
      },
      argumentText: ' tots3'
    }
  };
  const result = onMessage(event);
}
