export const ErrorMessage = (message) => {
  const errorNode = document.createElement('div')
  errorNode.classList.add('message')
  errorNode.appendChild(document.createTextNode(message))
  
  return errorNode
}
