import { Body, Engine, Events, Render, Runner, World } from 'matter-js'
import { blocks } from '../pages/play/setting.ts'
import { createBlock, getBlockIndex, getDynamicCanvasHeight, setField } from '../utils'
import { onMounted, Ref, ref } from 'vue'
import { useTimer } from './use-timer.ts'

export const usePlayer = (
  element: Ref<HTMLCanvasElement | undefined>,
) => {
  const engine = Engine.create(
    {
      gravity: { x: 0, y: 0.4 },
      timing: { timeScale: 1.5 },
    })
  const runner = Runner.create()

  const collisions = new Set()

  let width = 0
  let height = 0
  let ratio = 1
  const groundHeightRef = ref(0)

  let isSetBlock: boolean = false
  let currentBlock: Body | undefined = undefined
  let totalBlockCount = 0
  let canvasOffsetX = 0

  const gameOverRef = ref(false)
  const nextBlockRef = ref(0)
  const scoreRef = ref(0)

  onMounted(() => {
    if (!element.value) {
      return
    }
    width = element.value.clientWidth
    height = getDynamicCanvasHeight(width)
    ratio = width / 380
    canvasOffsetX = element.value?.getBoundingClientRect().x
    groundHeightRef.value = element.value?.clientHeight - height
    setNextBlock()
    addBlock()

    const render = Render.create({
      canvas: element.value,
      engine,
      options: {
        wireframes: false,
        background: 'transparent',
        width,
        height,
        pixelRatio: window.devicePixelRatio,
      },
    })

    setField(engine.world, width, height)
    Render.run(render)
    Runner.run(runner, engine)

    element.value.addEventListener('mousemove', (event: MouseEvent) => {
      onDrag(event.offsetX)
    })

    element.value.addEventListener('mouseup', () => {
      drop()
    })

    element.value.addEventListener('touchmove', (event: TouchEvent) => {
      const x = event.touches[0].clientX - canvasOffsetX
      if (element?.value?.clientWidth && x > 0 && x < element.value.clientWidth) {
        onDrag(x)
      }
    }, { passive: true })

    element.value.addEventListener('touchend', () => {
      drop()
    })
  })

  Events.on(engine, 'collisionStart', (event) => {
    if (gameOverRef.value) {
      return
    }
    event.pairs.forEach((collision) => {
      if (collision.bodyA.label === 'line' || collision.bodyB.label === 'line') {
        const circle = collision.bodyA.label === 'line' ? collision.bodyB.id : collision.bodyA.id
        addCollisions(circle)
      }

      if (collision.bodyA.label !== collision.bodyB.label) {
        return
      }

      if (collision.bodyA.label === 'removed' || collision.bodyB.label === 'removed') {
        return
      }

      const index = Number(collision.bodyA.label)
      if (index === 10) {
        return
      }

      collision.bodyA.label = 'removed'
      collision.bodyB.label = 'removed'

      scoreRef.value = scoreRef.value + (blocks[index].score)

      const newBlock = createBlock(index + 1, collision.collision.supports[0].x, collision.collision.supports[0].y, ratio)
      World.remove(engine.world, [collision.bodyA, collision.bodyB])
      World.add(engine.world, newBlock)
    },
    )
  })

  Events.on(engine, 'collisionEnd', (event) => {
    event.pairs.forEach((collision) => {
      if (collision.bodyA.label === 'line' || collision.bodyB.label === 'line') {
        const circle = collision.bodyA.label === 'line' ? collision.bodyB.id : collision.bodyA.id
        removeCollisions(circle)
      }
    })
  })

  const { start, reset } = useTimer(3, () => {
    endGame()
  })

  const setLineCollisionTimer = () => {
    if (collisions.size > 0) {
      start()
      return
    }
    reset()
  }

  const addCollisions = (id: number) => {
    collisions.add(id)
    setLineCollisionTimer()
  }

  const removeCollisions = (id: number) => {
    collisions.delete(id)
    setLineCollisionTimer()
  }

  const addBlock = () => {
    // currentBlockRef.value = createBlock(4, widthRef.value / 2, 60, ratioRef.value, true)
    currentBlock = createBlock(nextBlockRef.value, width / 2, 60, ratio, true)
    isSetBlock = false
    World.add(engine.world, currentBlock)
    setNextBlock()
  }

  const setNextBlock = () => {
    totalBlockCount += 1
    nextBlockRef.value = getBlockIndex(totalBlockCount)
  }

  const drop = () => {
    if (gameOverRef.value) {
      return
    }
    if (!currentBlock || isSetBlock) {
      return
    }
    isSetBlock = true
    Body.setStatic(currentBlock, false)
    setTimeout(() => {
      addBlock()
    }, 1000)
  }

  const onDrag = (x: number) => {
    if (gameOverRef.value) {
      return
    }
    if (!currentBlock || isSetBlock) {
      return
    }
    Body.setPosition(currentBlock, { x, y: 60 })
  }

  const endGame = () => {
    gameOverRef.value = true
  }

  const replay = () => {
    scoreRef.value = 0

    collisions.clear()
    reset()

    gameOverRef.value = false

    totalBlockCount = 0

    World.clear(engine.world, false)
    setField(engine.world, width, height)

    setNextBlock()
    addBlock()
  }

  return { replay, nextBlockRef, groundHeightRef, gameOverRef, scoreRef }
}
