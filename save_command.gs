function handleSaveCommand(value) {
  let userProperties = PropertiesService.getUserProperties()
  userProperties.setProperty('savedValue', value)
  return 'Salvo!'
}

function handleRestoreCommand(value) {
  let userProperties = PropertiesService.getUserProperties()
  return userProperties.getProperty('savedValue')
}
