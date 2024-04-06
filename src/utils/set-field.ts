import { Bodies, Composite, World } from 'matter-js'

export const setField = (world: World, width: number, height: number) => {
  const bottom = Bodies.rectangle(width / 2, height, width, 30, {
    isStatic: true,
    restitution: 1,
    render: { fillStyle: '#81685A' },
  })
  const left = Bodies.rectangle(0, height / 2, 1, height, {
    isStatic: true,
    render: { fillStyle: '#FFFFFF' },
  })
  const right = Bodies.rectangle(width, height / 2, 1, height, {
    isStatic: true,
    render: { fillStyle: '#FFFFFF' },
  })
  const ratio = height / 560
  const line = Bodies.rectangle(width / 2, 110 * ratio, width, 2, {
    isStatic: true,
    isSensor: true,
    label: 'line',
    render: { fillStyle: '#FF6C6C' },
  })
  Composite.add(world, [line, bottom, left, right])
}
