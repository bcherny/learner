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
  constructor(public val: string, public children: TreeSet[] = []) {}
  public includesVal (a: string): boolean {
    return this.val === a || this.children.some(_ => _.includesVal(a))
  }
  public getByVal (a: string): TreeSet|void {
    switch (this.val) {
      case a: return this
      default: return this.children.map(_ => _.getByVal(a))[0]
    }
  }
  public append (a: TreeSet): TreeSet {
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
    if (this.state.tree.includesVal(b)) {
      // TODO
      return
    } else if (this.state.tree.includesVal(a)) {
      console.info(`learned: ${a} > ${b} (appending to ${b} to ${a})`)
      console.log('getByVal', a, this.state.tree.getByVal(a))
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
  public toPrettyPrintString() {
    return this.state.tree.toPrettyPrintString()
  }
}

const myLearner = new Learner
myLearner.train([
  'alpha',
  'baby',
  'beta',
  'cat',
  'dad',
  'dog'
])
console.log(`   done: ${myLearner.toPrettyPrintString()}`)
console.log(`is ambiguous: ${myLearner.isAmbiguous()}`)