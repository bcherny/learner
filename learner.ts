/*
  learn an alphabet given a training set
  
  demo: http://codepen.io/anon/pen/xZyXYW
  
  eg.
  [
    'alpha',
    'baby',
    'beta',
    'cat',
    'dad',
    'dog'
  ] => ['a', 'b', 'c', 'd', 'e', 'o']
*/

class Learner {

  constructor(){
    this.state = {
      learnedOrder: []
    }
  }
  knows (a: string): boolean {
    return this.state.learnedOrder.indexOf(a) > -1
  }
  isBefore (a: string, b: string): boolean|void {
    if (!this.knows(a) || !this.knows(b)) {
      return undefined
    }
    return this.state.learnedOrder.indexOf(a) < this.state.learnedOrder.indexOf(b)
  }
  learn (a: string, b: string) {

    if (this.knows(a) && this.knows(b)) {
      if (this.isBefore(a, b)) {
        log(`already learned fact: ${a} goes before ${b}`)
      } else {
        log(`contradictory fact! ordering of ${a} and ${b} is undefined!`)
      }
    } else if (this.knows(a)) {
      this.state.learnedOrder = insertAtIndex(b, this.state.learnedOrder.indexOf(a) + 1, this.state.learnedOrder)
      log(`learned fact: ${a} goes before ${b} (learned b)`)
      log(`world: [${this.getLearnedOrder().join(',')}]`)
    } else if (this.knows(b)) {
      this.state.learnedOrder = insertAtIndex(a, this.state.learnedOrder.indexOf(b) - 1, this.state.learnedOrder)
      log(`learned fact: ${a} goes before ${b} (learned a)`)
      log(`world: [${this.getLearnedOrder().join(',')}]`)
    } else {
      this.state.learnedOrder = insertAtIndex(b, 0, this.state.learnedOrder)
      this.state.learnedOrder = insertAtIndex(a, 0, this.state.learnedOrder)
      log(`learned fact: ${a} goes before ${b} (learned both)`)
      log(`world: [${this.getLearnedOrder().join(',')}]`)
    }

  }
  train (as: string[]) {
    as.reduce((a, b) => {
      const a0 = a.charAt(0)
      const b0 = b.charAt(0)
      if (a0 != b0) {
        this.learn(a0, b0)
      } else {
        this.train([a.slice(1), b.slice(1)])
      }
      return b
    })
  }
  
  getLearnedOrder(): string[] {
    return this.state.learnedOrder
  }
}

const learner = new Learner
learner.train([
  'alpha',
  'baby',
  'beta',
  'cat',
  'dad',
  'dog'
])

log(learner.getLearnedOrder().join(', '))

// immutable splice
function insertAtIndex<A>(element: A, index: number, array: A[]): A[] {
  return array.slice(0, index).concat(element).concat(array.slice(index))
}

// log for node and codepen
function log (a: string): void {
  if (typeof document != 'undefined') {
    document.body.innerHTML += a + '<br>'
  } else {
    console.log(a)
  }
}