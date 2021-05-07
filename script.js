document.addEventListener('DOMContentLoaded', init)
document.addEventListener('wheel', onScroll)

function init() {
  const container = document.getElementById('turtles')
  const viewPortHeight = window.innerHeight
  const turtleHeight = parseFloat(getComputedStyle(document.body).fontSize)
  amountOfTurtles = Math.ceil(viewPortHeight / turtleHeight) + 1

  for (let i = 0; i < amountOfTurtles; i++) {
    const turtle = document.createElement('div')
    turtle.classList.add('turtle')
    turtle.textContent = '🐢'
    turtle.style.top = `${(i - 1) * turtleHeight}px`

    container.appendChild(turtle)
  }
}

function onScroll(event) {
  const container = document.getElementById('turtles')
  const viewPortHeight = window.innerHeight
  const turtleHeight = parseFloat(getComputedStyle(document.body).fontSize)
  const deltaY = Math.min(event.deltaY, 100) // large deltaY cause problems and 100 is sufficiently fast

  document.querySelectorAll('.turtle').forEach((turtle) => {
    const top = getHeight(turtle)
    let newTop = top - deltaY

    if (newTop < -turtleHeight) {
      const lastTurtle = document.querySelector('.turtle:last-of-type')
      container.appendChild(turtle)
      newTop = getHeight(lastTurtle) + turtleHeight - deltaY
    } else if (newTop > viewPortHeight) {
      const firstTurtle = document.querySelector('.turtle:first-of-type')
      container.insertBefore(turtle, firstTurtle)
      newTop = getHeight(firstTurtle) - turtleHeight
    }

    turtle.style.top = `${newTop}px`
  })
}

function getHeight(element) {
  return +element.style.top.substr(0, element.style.top.length - 2)
}
