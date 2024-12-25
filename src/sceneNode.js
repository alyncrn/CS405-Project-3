/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        //get the local transformation matrix
        const localTransform = this.trs.getTransformationMatrix();

        //update transformation matrices
        const updatedModelMatrix = MatrixMult(modelMatrix, localTransform);
        const updatedModelView = MatrixMult(modelView, localTransform);
        const updatedMVP = MatrixMult(mvp, localTransform);
        const updatedNormalMatrix = MatrixMult(normalMatrix, localTransform);

        //draw the current node's mesh
        if (this.meshDrawer) {
            this.meshDrawer.draw(updatedMVP, updatedModelView, updatedNormalMatrix, updatedModelMatrix);
        }

        //recursively draw children
        for (const child of this.children) {
            child.draw(updatedMVP, updatedModelView, updatedNormalMatrix, updatedModelMatrix);
        }
    }

    

}