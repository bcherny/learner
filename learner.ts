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
const {without} = require('lodash')

class TreeSet {

  // TODO: is there a better way to implement this?
  // maybe split TreeSet into TreeSet and TreeSetNode
  private static index = {}

  constructor(
    public val: string,
    public children: TreeSet[] = [],
    public parent?: TreeSet|void
   ) {
    TreeSet.index[val] = this
  }

  public includesVal (a: string): boolean {
    return this.val === a || this.children.some(_ => _.includesVal(a))
  }
  public static getByVal (a: string): TreeSet|void {
    return TreeSet.index[a]
  }
  public getRoot(): TreeSet {
    return this.parent
      ? this.parent.getRoot()
      : this
  }
  public removeChild (a: TreeSet): void {
    this.children = without(this.children, a)
  }
  public addChild (a: TreeSet): TreeSet {

    // rm, if it already exists
    const existingNode = TreeSet.getByVal(a.val)
    if (existingNode && existingNode.parent) {
      existingNode.parent.removeChild(existingNode)
    }

    // add
    a.parent = this
    this.children.push(a)

    return this
  }
  public toString (): string {
    return this.children.length
      ? `(${this.val} => ${this.children.map(_ => _.toString())})`
      : this.val
  }
  public toPrettyString () {
    return prettyTree({
      label: this.val,
      nodes: this.children.map(_ => _.toPrettyString())
    })
  }
}

class Learner {
  private state = {
    tree: new TreeSet('root')
  }
  public isAmbiguous(): boolean {
    return this.state.tree.children.length > 1
        || this.state.tree.children.some(_ => _.children.length > 1)
  }
  public learn (a: string, b: string): void {
    if ([a,b].every(this.state.tree.includesVal.bind(this.state.tree))) {
      console.info(`learned: ${a} > ${b} (addChilding to ${b} to ${a})`)
      TreeSet.getByVal(a).addChild(TreeSet.getByVal(b))
    } else if (this.state.tree.includesVal(b)) {
      // TODO: can this ever happen, assuming that training data arrives in order?
    } else if (this.state.tree.includesVal(a)) {
      console.info(`learned: ${a} > ${b} (addChilding to ${b} to ${a})`)
      TreeSet.getByVal(a).addChild(new TreeSet(b))
    } else {
      console.info(`learned: ${a} > ${b} (addChilding ${b} to ${a} to root)`)
      this.state.tree.getRoot().addChild(
        new TreeSet(a).addChild(new TreeSet(b))
      )
    }
    console.info(`  world: ${this.toPrettyString()}`)
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
  public toPrettyString(): string {
    return this.state.tree.toPrettyString()
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
// console.log(`   done: ${a.toPrettyString()}`)
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
  'ralph',
  'orange'
])
console.log(`   done: ${b.toPrettyString()}`)
console.assert(b.isAmbiguous() === false)
console.assert(b.toString() === '(root => (a => (b => (c => (d => (e => (r => o)))))))')