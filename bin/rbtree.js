Object.defineProperty(exports, "__esModule", { value: true });
var RED = 0;
var BLACK = 1;
var RBNode = /** @class */ (function () {
    function RBNode(color, key, value, left, right, count) {
        this._color = color;
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
        this._count = count;
    }
    return RBNode;
}());
exports.RBNode = RBNode;
function cloneNode(node) {
    return new RBNode(node._color, node.key, node.value, node.left, node.right, node._count);
}
function repaint(color, node) {
    return new RBNode(color, node.key, node.value, node.left, node.right, node._count);
}
function recount(node) {
    node._count = 1 + (node.left ? node.left._count : 0) + (node.right ? node.right._count : 0);
}
var RedBlackTree = /** @class */ (function () {
    function RedBlackTree(compare, root) {
        this._compare = compare;
        this.root = root;
    }
    RedBlackTree.prototype.keys = function () {
        var result = [];
        this.forEach(function (k, v) {
            result.push(k);
        });
        return result;
    };
    RedBlackTree.prototype.values = function () {
        var result = [];
        this.forEach(function (k, v) {
            result.push(v);
        });
        return result;
    };
    RedBlackTree.prototype.length = function () {
        if (this.root) {
            return this.root._count;
        }
        return 0;
    };
    RedBlackTree.prototype.insert = function (key, value) {
        var cmp = this._compare;
        //Find point to insert new node at
        var n = this.root;
        var n_stack = [];
        var d_stack = [];
        while (n) {
            var d = cmp(key, n.key);
            n_stack.push(n);
            d_stack.push(d);
            if (d <= 0) {
                n = n.left;
            }
            else {
                n = n.right;
            }
        }
        //Rebuild path to leaf node
        n_stack.push(new RBNode(RED, key, value, null, null, 1));
        for (var s = n_stack.length - 2; s >= 0; --s) {
            var n = n_stack[s];
            if (d_stack[s] <= 0) {
                n_stack[s] = new RBNode(n._color, n.key, n.value, n_stack[s + 1], n.right, n._count + 1);
            }
            else {
                n_stack[s] = new RBNode(n._color, n.key, n.value, n.left, n_stack[s + 1], n._count + 1);
            }
        }
        //Rebalance tree using rotations
        //console.log("start insert", key, d_stack)
        for (var s = n_stack.length - 1; s > 1; --s) {
            var p = n_stack[s - 1];
            var n = n_stack[s];
            if (p._color === BLACK || n._color === BLACK) {
                break;
            }
            var pp = n_stack[s - 2];
            if (pp.left === p) {
                if (p.left === n) {
                    var y = pp.right;
                    if (y && y._color === RED) {
                        //console.log("LLr")
                        p._color = BLACK;
                        pp.right = repaint(BLACK, y);
                        pp._color = RED;
                        s -= 1;
                    }
                    else {
                        //console.log("LLb")
                        pp._color = RED;
                        pp.left = p.right;
                        p._color = BLACK;
                        p.right = pp;
                        n_stack[s - 2] = p;
                        n_stack[s - 1] = n;
                        recount(pp);
                        recount(p);
                        if (s >= 3) {
                            var ppp = n_stack[s - 3];
                            if (ppp.left === pp) {
                                ppp.left = p;
                            }
                            else {
                                ppp.right = p;
                            }
                        }
                        break;
                    }
                }
                else {
                    var y = pp.right;
                    if (y && y._color === RED) {
                        //console.log("LRr")
                        p._color = BLACK;
                        pp.right = repaint(BLACK, y);
                        pp._color = RED;
                        s -= 1;
                    }
                    else {
                        //console.log("LRb")
                        p.right = n.left;
                        pp._color = RED;
                        pp.left = n.right;
                        n._color = BLACK;
                        n.left = p;
                        n.right = pp;
                        n_stack[s - 2] = n;
                        n_stack[s - 1] = p;
                        recount(pp);
                        recount(p);
                        recount(n);
                        if (s >= 3) {
                            var ppp = n_stack[s - 3];
                            if (ppp.left === pp) {
                                ppp.left = n;
                            }
                            else {
                                ppp.right = n;
                            }
                        }
                        break;
                    }
                }
            }
            else {
                if (p.right === n) {
                    var y = pp.left;
                    if (y && y._color === RED) {
                        //console.log("RRr", y.key)
                        p._color = BLACK;
                        pp.left = repaint(BLACK, y);
                        pp._color = RED;
                        s -= 1;
                    }
                    else {
                        //console.log("RRb")
                        pp._color = RED;
                        pp.right = p.left;
                        p._color = BLACK;
                        p.left = pp;
                        n_stack[s - 2] = p;
                        n_stack[s - 1] = n;
                        recount(pp);
                        recount(p);
                        if (s >= 3) {
                            var ppp = n_stack[s - 3];
                            if (ppp.right === pp) {
                                ppp.right = p;
                            }
                            else {
                                ppp.left = p;
                            }
                        }
                        break;
                    }
                }
                else {
                    var y = pp.left;
                    if (y && y._color === RED) {
                        //console.log("RLr")
                        p._color = BLACK;
                        pp.left = repaint(BLACK, y);
                        pp._color = RED;
                        s -= 1;
                    }
                    else {
                        //console.log("RLb")
                        p.left = n.right;
                        pp._color = RED;
                        pp.right = n.left;
                        n._color = BLACK;
                        n.right = p;
                        n.left = pp;
                        n_stack[s - 2] = n;
                        n_stack[s - 1] = p;
                        recount(pp);
                        recount(p);
                        recount(n);
                        if (s >= 3) {
                            var ppp = n_stack[s - 3];
                            if (ppp.right === pp) {
                                ppp.right = n;
                            }
                            else {
                                ppp.left = n;
                            }
                        }
                        break;
                    }
                }
            }
        }
        //Return new tree
        n_stack[0]._color = BLACK;
        return new RedBlackTree(cmp, n_stack[0]);
    };
    RedBlackTree.prototype.forEach = function (visit, lo, hi) {
        if (!this.root) {
            return;
        }
        switch (arguments.length) {
            case 1:
                return doVisitFull(visit, this.root);
                break;
            case 2:
                return doVisitHalf(lo, this._compare, visit, this.root);
                break;
            case 3:
                if (this._compare(lo, hi) >= 0) {
                    return;
                }
                return doVisit(lo, hi, this._compare, visit, this.root);
                break;
        }
    };
    RedBlackTree.prototype.begin = function () {
        var stack = [];
        var n = this.root;
        while (n) {
            stack.push(n);
            n = n.left;
        }
        return new RedBlackTreeIterator(this, stack);
    };
    RedBlackTree.prototype.end = function () {
        var stack = [];
        var n = this.root;
        while (n) {
            stack.push(n);
            n = n.right;
        }
        return new RedBlackTreeIterator(this, stack);
    };
    //Find the ith item in the tree
    RedBlackTree.prototype.at = function (idx) {
        if (idx < 0) {
            return new RedBlackTreeIterator(this, []);
        }
        var n = this.root;
        var stack = [];
        while (true) {
            stack.push(n);
            if (n.left) {
                if (idx < n.left._count) {
                    n = n.left;
                    continue;
                }
                idx -= n.left._count;
            }
            if (!idx) {
                return new RedBlackTreeIterator(this, stack);
            }
            idx -= 1;
            if (n.right) {
                if (idx >= n.right._count) {
                    break;
                }
                n = n.right;
            }
            else {
                break;
            }
        }
        return new RedBlackTreeIterator(this, []);
    };
    RedBlackTree.prototype.ge = function (key) {
        var cmp = this._compare;
        var n = this.root;
        var stack = [];
        var last_ptr = 0;
        while (n) {
            var d = cmp(key, n.key);
            stack.push(n);
            if (d <= 0) {
                last_ptr = stack.length;
            }
            if (d <= 0) {
                n = n.left;
            }
            else {
                n = n.right;
            }
        }
        stack.length = last_ptr;
        return new RedBlackTreeIterator(this, stack);
    };
    RedBlackTree.prototype.gt = function (key) {
        var cmp = this._compare;
        var n = this.root;
        var stack = [];
        var last_ptr = 0;
        while (n) {
            var d = cmp(key, n.key);
            stack.push(n);
            if (d < 0) {
                last_ptr = stack.length;
            }
            if (d < 0) {
                n = n.left;
            }
            else {
                n = n.right;
            }
        }
        stack.length = last_ptr;
        return new RedBlackTreeIterator(this, stack);
    };
    RedBlackTree.prototype.lt = function (key) {
        var cmp = this._compare;
        var n = this.root;
        var stack = [];
        var last_ptr = 0;
        while (n) {
            var d = cmp(key, n.key);
            stack.push(n);
            if (d > 0) {
                last_ptr = stack.length;
            }
            if (d <= 0) {
                n = n.left;
            }
            else {
                n = n.right;
            }
        }
        stack.length = last_ptr;
        return new RedBlackTreeIterator(this, stack);
    };
    RedBlackTree.prototype.le = function (key) {
        var cmp = this._compare;
        var n = this.root;
        var stack = [];
        var last_ptr = 0;
        while (n) {
            var d = cmp(key, n.key);
            stack.push(n);
            if (d >= 0) {
                last_ptr = stack.length;
            }
            if (d < 0) {
                n = n.left;
            }
            else {
                n = n.right;
            }
        }
        stack.length = last_ptr;
        return new RedBlackTreeIterator(this, stack);
    };
    //Finds the item with key if it exists
    RedBlackTree.prototype.find = function (key) {
        var cmp = this._compare;
        var n = this.root;
        var stack = [];
        while (n) {
            var d = cmp(key, n.key);
            stack.push(n);
            if (d === 0) {
                return new RedBlackTreeIterator(this, stack);
            }
            if (d <= 0) {
                n = n.left;
            }
            else {
                n = n.right;
            }
        }
        return new RedBlackTreeIterator(this, []);
    };
    //Removes item with key from tree
    RedBlackTree.prototype.remove = function (key) {
        var iter = this.find(key);
        if (iter) {
            return iter.remove();
        }
        return this;
    };
    //Returns the item at `key`
    RedBlackTree.prototype.get = function (key) {
        var cmp = this._compare;
        var n = this.root;
        while (n) {
            var d = cmp(key, n.key);
            if (d === 0) {
                return n.value;
            }
            if (d <= 0) {
                n = n.left;
            }
            else {
                n = n.right;
            }
        }
        return;
    };
    return RedBlackTree;
}());
exports.RedBlackTree = RedBlackTree;
//Visit all nodes inorder
function doVisitFull(visit, node) {
    if (node.left) {
        var v = doVisitFull(visit, node.left);
        if (v) {
            return v;
        }
    }
    var v = visit(node.key, node.value);
    if (v) {
        return v;
    }
    if (node.right) {
        return doVisitFull(visit, node.right);
    }
}
//Visit half nodes in order
function doVisitHalf(lo, compare, visit, node) {
    var l = compare(lo, node.key);
    if (l <= 0) {
        if (node.left) {
            var v = doVisitHalf(lo, compare, visit, node.left);
            if (v) {
                return v;
            }
        }
        var v = visit(node.key, node.value);
        if (v) {
            return v;
        }
    }
    if (node.right) {
        return doVisitHalf(lo, compare, visit, node.right);
    }
}
//Visit all nodes within a range
function doVisit(lo, hi, compare, visit, node) {
    var l = compare(lo, node.key);
    var h = compare(hi, node.key);
    var v;
    if (l <= 0) {
        if (node.left) {
            v = doVisit(lo, hi, compare, visit, node.left);
            if (v) {
                return v;
            }
        }
        if (h > 0) {
            v = visit(node.key, node.value);
            if (v) {
                return v;
            }
        }
    }
    if (h > 0 && node.right) {
        return doVisit(lo, hi, compare, visit, node.right);
    }
}
var RedBlackTreeIterator = /** @class */ (function () {
    function RedBlackTreeIterator(tree, stack) {
        this.tree = tree;
        this._stack = stack;
    }
    RedBlackTreeIterator.prototype.valid = function () {
        return this._stack.length > 0;
    };
    RedBlackTreeIterator.prototype.node = function () {
        if (this._stack.length > 0) {
            return this._stack[this._stack.length - 1];
        }
        return null;
    };
    RedBlackTreeIterator.prototype.clone = function () {
        return new RedBlackTreeIterator(this.tree, this._stack.slice());
    };
    //Removes item at iterator from tree
    RedBlackTreeIterator.prototype.remove = function () {
        var stack = this._stack;
        if (stack.length === 0) {
            return this.tree;
        }
        //First copy path to node
        var cstack = new Array(stack.length);
        var n = stack[stack.length - 1];
        cstack[cstack.length - 1] = new RBNode(n._color, n.key, n.value, n.left, n.right, n._count);
        for (var i = stack.length - 2; i >= 0; --i) {
            var n = stack[i];
            if (n.left === stack[i + 1]) {
                cstack[i] = new RBNode(n._color, n.key, n.value, cstack[i + 1], n.right, n._count);
            }
            else {
                cstack[i] = new RBNode(n._color, n.key, n.value, n.left, cstack[i + 1], n._count);
            }
        }
        //Get node
        n = cstack[cstack.length - 1];
        //console.log("start remove: ", n.value)
        //If not leaf, then swap with previous node
        if (n.left && n.right) {
            //console.log("moving to leaf")
            //First walk to previous leaf
            var split = cstack.length;
            n = n.left;
            while (n.right) {
                cstack.push(n);
                n = n.right;
            }
            //Copy path to leaf
            var v = cstack[split - 1];
            cstack.push(new RBNode(n._color, v.key, v.value, n.left, n.right, n._count));
            cstack[split - 1].key = n.key;
            cstack[split - 1].value = n.value;
            //Fix up stack
            for (var i = cstack.length - 2; i >= split; --i) {
                n = cstack[i];
                cstack[i] = new RBNode(n._color, n.key, n.value, n.left, cstack[i + 1], n._count);
            }
            cstack[split - 1].left = cstack[split];
        }
        //console.log("stack=", cstack.map(function(v) { return v.value }))
        //Remove leaf node
        n = cstack[cstack.length - 1];
        if (n._color === RED) {
            //Easy case: removing red leaf
            //console.log("RED leaf")
            var p = cstack[cstack.length - 2];
            if (p.left === n) {
                p.left = null;
            }
            else if (p.right === n) {
                p.right = null;
            }
            cstack.pop();
            for (var i = 0; i < cstack.length; ++i) {
                cstack[i]._count--;
            }
            return new RedBlackTree(this.tree._compare, cstack[0]);
        }
        else {
            if (n.left || n.right) {
                //Second easy case:  Single child black parent
                //console.log("BLACK single child")
                if (n.left) {
                    swapNode(n, n.left);
                }
                else if (n.right) {
                    swapNode(n, n.right);
                }
                //Child must be red, so repaint it black to balance color
                n._color = BLACK;
                for (var i = 0; i < cstack.length - 1; ++i) {
                    cstack[i]._count--;
                }
                return new RedBlackTree(this.tree._compare, cstack[0]);
            }
            else if (cstack.length === 1) {
                //Third easy case: root
                //console.log("ROOT")
                return new RedBlackTree(this.tree._compare, null);
            }
            else {
                //Hard case: Repaint n, and then do some nasty stuff
                //console.log("BLACK leaf no children")
                for (var i = 0; i < cstack.length; ++i) {
                    cstack[i]._count--;
                }
                var parent = cstack[cstack.length - 2];
                fixDoubleBlack(cstack);
                //Fix up links
                if (parent.left === n) {
                    parent.left = null;
                }
                else {
                    parent.right = null;
                }
            }
        }
        return new RedBlackTree(this.tree._compare, cstack[0]);
    };
    RedBlackTreeIterator.prototype.key = function () {
        if (this._stack.length > 0) {
            return this._stack[this._stack.length - 1].key;
        }
        return;
    };
    RedBlackTreeIterator.prototype.value = function () {
        if (this._stack.length > 0) {
            return this._stack[this._stack.length - 1].value;
        }
        return;
    };
    RedBlackTreeIterator.prototype.index = function () {
        var idx = 0;
        var stack = this._stack;
        if (stack.length === 0) {
            var r = this.tree.root;
            if (r) {
                return r._count;
            }
            return 0;
        }
        else if (stack[stack.length - 1].left) {
            idx = stack[stack.length - 1].left._count;
        }
        for (var s = stack.length - 2; s >= 0; --s) {
            if (stack[s + 1] === stack[s].right) {
                ++idx;
                if (stack[s].left) {
                    idx += stack[s].left._count;
                }
            }
        }
        return idx;
    };
    //Advances iterator to next element in list
    RedBlackTreeIterator.prototype.next = function () {
        var stack = this._stack;
        if (stack.length === 0) {
            return;
        }
        var n = stack[stack.length - 1];
        if (n.right) {
            n = n.right;
            while (n) {
                stack.push(n);
                n = n.left;
            }
        }
        else {
            stack.pop();
            while (stack.length > 0 && stack[stack.length - 1].right === n) {
                n = stack[stack.length - 1];
                stack.pop();
            }
        }
    };
    RedBlackTreeIterator.prototype.hasNext = function () {
        var stack = this._stack;
        if (stack.length === 0) {
            return false;
        }
        if (stack[stack.length - 1].right) {
            return true;
        }
        for (var s = stack.length - 1; s > 0; --s) {
            if (stack[s - 1].left === stack[s]) {
                return true;
            }
        }
        return false;
    };
    RedBlackTreeIterator.prototype.update = function (value) {
        var stack = this._stack;
        if (stack.length === 0) {
            throw new Error("Can't update empty node!");
        }
        var cstack = new Array(stack.length);
        var n = stack[stack.length - 1];
        cstack[cstack.length - 1] = new RBNode(n._color, n.key, value, n.left, n.right, n._count);
        for (var i = stack.length - 2; i >= 0; --i) {
            n = stack[i];
            if (n.left === stack[i + 1]) {
                cstack[i] = new RBNode(n._color, n.key, n.value, cstack[i + 1], n.right, n._count);
            }
            else {
                cstack[i] = new RBNode(n._color, n.key, n.value, n.left, cstack[i + 1], n._count);
            }
        }
        return new RedBlackTree(this.tree._compare, cstack[0]);
    };
    //Moves iterator backward one element
    RedBlackTreeIterator.prototype.prev = function () {
        var stack = this._stack;
        if (stack.length === 0) {
            return;
        }
        var n = stack[stack.length - 1];
        if (n.left) {
            n = n.left;
            while (n) {
                stack.push(n);
                n = n.right;
            }
        }
        else {
            stack.pop();
            while (stack.length > 0 && stack[stack.length - 1].left === n) {
                n = stack[stack.length - 1];
                stack.pop();
            }
        }
    };
    RedBlackTreeIterator.prototype.hasPrev = function () {
        var stack = this._stack;
        if (stack.length === 0) {
            return false;
        }
        if (stack[stack.length - 1].left) {
            return true;
        }
        for (var s = stack.length - 1; s > 0; --s) {
            if (stack[s - 1].right === stack[s]) {
                return true;
            }
        }
        return false;
    };
    return RedBlackTreeIterator;
}());
exports.RedBlackTreeIterator = RedBlackTreeIterator;
//Swaps two nodes
function swapNode(n, v) {
    n.key = v.key;
    n.value = v.value;
    n.left = v.left;
    n.right = v.right;
    n._color = v._color;
    n._count = v._count;
}
//Fix up a double black node in a tree
function fixDoubleBlack(stack) {
    var n, p, s, z;
    for (var i = stack.length - 1; i >= 0; --i) {
        n = stack[i];
        if (i === 0) {
            n._color = BLACK;
            return;
        }
        //console.log("visit node:", n.key, i, stack[i].key, stack[i-1].key)
        p = stack[i - 1];
        if (p.left === n) {
            //console.log("left child")
            s = p.right;
            if (s.right && s.right._color === RED) {
                //console.log("case 1: right sibling child red")
                s = p.right = cloneNode(s);
                z = s.right = cloneNode(s.right);
                p.right = s.left;
                s.left = p;
                s.right = z;
                s._color = p._color;
                n._color = BLACK;
                p._color = BLACK;
                z._color = BLACK;
                recount(p);
                recount(s);
                if (i > 1) {
                    var pp = stack[i - 2];
                    if (pp.left === p) {
                        pp.left = s;
                    }
                    else {
                        pp.right = s;
                    }
                }
                stack[i - 1] = s;
                return;
            }
            else if (s.left && s.left._color === RED) {
                //console.log("case 1: left sibling child red")
                s = p.right = cloneNode(s);
                z = s.left = cloneNode(s.left);
                p.right = z.left;
                s.left = z.right;
                z.left = p;
                z.right = s;
                z._color = p._color;
                p._color = BLACK;
                s._color = BLACK;
                n._color = BLACK;
                recount(p);
                recount(s);
                recount(z);
                if (i > 1) {
                    var pp = stack[i - 2];
                    if (pp.left === p) {
                        pp.left = z;
                    }
                    else {
                        pp.right = z;
                    }
                }
                stack[i - 1] = z;
                return;
            }
            if (s._color === BLACK) {
                if (p._color === RED) {
                    //console.log("case 2: black sibling, red parent", p.right.value)
                    p._color = BLACK;
                    p.right = repaint(RED, s);
                    return;
                }
                else {
                    //console.log("case 2: black sibling, black parent", p.right.value)
                    p.right = repaint(RED, s);
                    continue;
                }
            }
            else {
                //console.log("case 3: red sibling")
                s = cloneNode(s);
                p.right = s.left;
                s.left = p;
                s._color = p._color;
                p._color = RED;
                recount(p);
                recount(s);
                if (i > 1) {
                    var pp = stack[i - 2];
                    if (pp.left === p) {
                        pp.left = s;
                    }
                    else {
                        pp.right = s;
                    }
                }
                stack[i - 1] = s;
                stack[i] = p;
                if (i + 1 < stack.length) {
                    stack[i + 1] = n;
                }
                else {
                    stack.push(n);
                }
                i = i + 2;
            }
        }
        else {
            //console.log("right child")
            s = p.left;
            if (s.left && s.left._color === RED) {
                //console.log("case 1: left sibling child red", p.value, p._color)
                s = p.left = cloneNode(s);
                z = s.left = cloneNode(s.left);
                p.left = s.right;
                s.right = p;
                s.left = z;
                s._color = p._color;
                n._color = BLACK;
                p._color = BLACK;
                z._color = BLACK;
                recount(p);
                recount(s);
                if (i > 1) {
                    var pp = stack[i - 2];
                    if (pp.right === p) {
                        pp.right = s;
                    }
                    else {
                        pp.left = s;
                    }
                }
                stack[i - 1] = s;
                return;
            }
            else if (s.right && s.right._color === RED) {
                //console.log("case 1: right sibling child red")
                s = p.left = cloneNode(s);
                z = s.right = cloneNode(s.right);
                p.left = z.right;
                s.right = z.left;
                z.right = p;
                z.left = s;
                z._color = p._color;
                p._color = BLACK;
                s._color = BLACK;
                n._color = BLACK;
                recount(p);
                recount(s);
                recount(z);
                if (i > 1) {
                    var pp = stack[i - 2];
                    if (pp.right === p) {
                        pp.right = z;
                    }
                    else {
                        pp.left = z;
                    }
                }
                stack[i - 1] = z;
                return;
            }
            if (s._color === BLACK) {
                if (p._color === RED) {
                    //console.log("case 2: black sibling, red parent")
                    p._color = BLACK;
                    p.left = repaint(RED, s);
                    return;
                }
                else {
                    //console.log("case 2: black sibling, black parent")
                    p.left = repaint(RED, s);
                    continue;
                }
            }
            else {
                //console.log("case 3: red sibling")
                s = cloneNode(s);
                p.left = s.right;
                s.right = p;
                s._color = p._color;
                p._color = RED;
                recount(p);
                recount(s);
                if (i > 1) {
                    var pp = stack[i - 2];
                    if (pp.right === p) {
                        pp.right = s;
                    }
                    else {
                        pp.left = s;
                    }
                }
                stack[i - 1] = s;
                stack[i] = p;
                if (i + 1 < stack.length) {
                    stack[i + 1] = n;
                }
                else {
                    stack.push(n);
                }
                i = i + 2;
            }
        }
    }
}
//Default comparison function
function defaultCompare(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
//Build a tree
function createRBTree(compare) {
    return new RedBlackTree(compare || defaultCompare, null);
}
exports.createRBTree = createRBTree;
/*
https://github.com/mikolalysenko/functional-red-black-tree/blob/master/LICENSE

The MIT License (MIT)

Copyright (c) 2013 Mikola Lysenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/ 
//# sourceMappingURL=rbtree.js.map