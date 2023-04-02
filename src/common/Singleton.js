export default class CommonDataManager {
    static myInstance = null;
    _isCustomer = null;
    image = null;
    name = null;
    user = null;

    // googleUserProfileUri = “”;
    // /**
    //  * @returns {CommonDataManager}
    //  */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }
        return this.myInstance;
    }

    getIsCustomer() {
        return this._isCustomer;
    }
    setIsCustomer(res) {
        this._isCustomer = res;
    }

    getImage() {
        return this.image;
    }
    setImage(res) {
        this.image = res;
    }

    getName() {
        return this.name;
    }
    setName(res) {
        this.name = res;
    }

    getUser() {
        return this.user;
    }
    setUser(res) {
        this.user = res;
    }
}
