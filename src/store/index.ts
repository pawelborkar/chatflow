import { atom } from "jotai";
import { INode } from "../interfaces";

const isEditAtom = atom<boolean>(false)
const messageContentAtom = atom<string>("")
const nodesAtom = atom<Array<INode>>([])
const nodeAtom = atom<any | INode>({})


export { isEditAtom, nodesAtom, nodeAtom, messageContentAtom }
