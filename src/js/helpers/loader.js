// -------------------------------------------------------------------
// :: Loader
// -------------------------------------------------------------------

export default class Loader {

	constructor({ assetPath = '/assets' }) {

        this._texture = new THREE.TextureLoader()
        this._model = new THREE.FBXLoader()
        
    }
    
}