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

const prettyTree = require('pretty-tree')

class TreeSet {

  // TODO: split TreeSet into TreeSet and TreeSetNode
  private static index = {}

  constructor(public val: string, public children: TreeSet[] = []) {
    TreeSet.index[val] = this
  }
  public includesVal (a: string): boolean {
    return this.val === a || this.children.some(_ => _.includesVal(a))
  }
  public getByVal (a: string): TreeSet|void {
    return TreeSet.index[a]
  }
  public append (a: TreeSet): TreeSet {
    // TODO: rm from an existing point in the tree, if it already exists
    this.children.push(a)
    return this
  }
  public toString (): string {
    return this.children.length
      ? `(${this.val} => ${this.children.map(_ => _.toString())})`
      : this.val
  }
  public toPrettyPrintString () {
    return prettyTree({
      label: this.val,
      nodes: this.children.map(_ => _.toPrettyPrintString())
    })
  }
}

class Learner {
  private state = {
    tree: new TreeSet('root')
  }
  public getTree (): string {
    return this.state.tree.toString()
  }
  public isAmbiguous(): boolean {
    return this.state.tree.children.length > 1 || this.state.tree.children.some(_ => _.children.length > 1)
  }
  public learn (a: string, b: string): void {
    if ([a,b].every(this.state.tree.includesVal)) {
      console.info(`learned: ${a} > ${b} (appending to ${b} to ${a})`)
      this.state.tree.getByVal(b).append(this.state.tree.getByVal(a))
    } else if (this.state.tree.includesVal(a)) {
      console.info(`learned: ${a} > ${b} (appending to ${b} to ${a})`)
      this.state.tree.getByVal(a).append(new TreeSet(b))
    } else {
      console.info(`learned: ${a} > ${b} (appending ${b} to ${a} to root)`)
      const _a = new TreeSet(a)
      _a.append(new TreeSet(b))
      this.state.tree.getByVal('root').append(_a)
    }
    console.info(`  world: ${this.getTree()}`)
  }
  public train (as: string[]): void {
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
  public toPrettyPrintString(): string {
    return this.state.tree.toPrettyPrintString()
  }
  public toString(): string {
    return this.state.tree.toString()
  }
}

// test case 1
// const a = new Learner
// a.train([
//   'alpha',
//   'baby',
//   'beta',
//   'cat',
//   'dad',
//   'dog'
// ])
// console.log(`   done: ${a.toPrettyPrintString()}`)
// console.assert(a.isAmbiguous() === true)
// console.assert(a.toString() === '(root => (a => (b => (c => d)),e,o))')

// test case 2
const b = new Learner
b.train([
  'alpha',
  'baby',
  'beta',
  'brownies',
  'cat',
  'dad',
  'dog',
  'elephant',
  'ralph'
])
console.log(`   done: ${b.toPrettyPrintString()}`)