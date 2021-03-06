import { _decorator, Component, Node, Prefab, instantiate, loader } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('COMMON.AxisHelper')
@menu('common/AxisHelper')
export class AxisHelper extends Component {

    private static _axis: Prefab = null;
    private static _insArr: AxisHelper[] = [];
    private _ins: Node = null;

    constructor () {
        super();
        AxisHelper._insArr.push(this);
    }

    __preload () {
        if (AxisHelper._axis == null) {
            loader.loadRes('common/prefabs/Axis', Prefab, (...args) => {
                if (args) {
                    if (args[0]) {
                        console.error(args[0]);
                    } else {
                        AxisHelper._axis = args[1] as Prefab;
                        AxisHelper._insArr.forEach((v: AxisHelper) => {
                            if (!v._ins && v.enabled && v.enabledInHierarchy && v.node.active && v.node.activeInHierarchy) v.onEnable();
                        })
                    }
                }
            });
        }
    }

    onEnable () {
        if (AxisHelper._axis) {
            if (this._ins == null) this._ins = instantiate(AxisHelper._axis);

            this.node.addChild(this._ins);
        }
    }

    onDisable () {
        if (AxisHelper._axis) {
            this.node.removeChild(this._ins);
        }
    }

    onDestroy () {
        const index = AxisHelper._insArr.indexOf(this);
        if (index >= 0) {
            AxisHelper._insArr.splice(index, 1);
        }
        if (this._ins) {
            this._ins.destroy();
        }
    }
}