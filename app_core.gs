/**
 * Responds to a MESSAGE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onMessage(event) {

  let message = '';
  const params = event.message.text.split(' ');

  message = handleCommand(params[0], params.slice(1));

  return { "text": message };
}

/**
 * Responds to an ADDED_TO_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onAddToSpace(event) {
  let message = "";

  if (event.space.singleUserBotDm) {
    message = "Obrigado por me adicionar " + event.user.displayName + "!";
  } else {
    message = "Obrigado por me adicionar " +
        (event.space.displayName ? event.space.displayName : " a este chat");
  }

  if (event.message) {
    // Bot added through @mention.
    message = message + " e você disse: \"" + event.message.text + "\"";
  }

  return { "text": message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Hangouts Chat.
 *
 * @param {Object} event the event object from Hangouts Chat
 */
function onRemoveFromSpace(event) {
  console.info("Bot removed from ",
      (event.space.name ? event.space.name : "this chat"));
}

