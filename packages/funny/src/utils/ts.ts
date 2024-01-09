const obj = {
  path: '/',
  name: 'home',
  meta: 'home1'
} as const
// const obj = Object.freeze({
//   path: '/',
//   name: 'home',
//   meta: 'home1'
//  }) 
// type ReturnKey = keyof obj
type ReturnOfObj = typeof obj
const getRoute = (value: '/' | 'home' | 'home1') => {}
getRoute(obj.meta) // type 'string' is not assignable to parameter of type '"/" | "home" | "home1"'

//inerface type的区别 type可以声明联合类型 typeof
/**
* type StringOrNumber = string | number;  
type Text = string | { text: string };  
type NameLookup = Dictionary<string, Person>;  
type Callback<T> = (data: T) => void;  
type Pair<T> = [T, T];  
type Coordinates = Pair<number>;  
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
type 能表示的任何类型组合。

interface 只能表示对象结构的类型。
extends 可以将属性的类型进行收窄，比如从 string | number 变成 string。
但声明合并不行，类型必须完全一致。
type &实现继承
interface Fn {
(): void; // 函数的描述
a: string; // 属性
}

type 是 TypeScript 中用于定义类型别名、联合类型、交叉类型等复杂类型的声明方式。

interface 可以通过关键字 extends 实现接口继承，通过关键字 implements 实现接口实现。这让我们可以创建具有多层次的类型结构。
class 是一种定义类型和实现的方式。它既包含类型信息，也包含实际的属性和方法实现。与 type 和 interface 不同，class 定义的类型信息会保留在编译后的代码中，因为它们在运行时是必需的。
 */