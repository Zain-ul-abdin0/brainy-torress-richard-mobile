export default class CommonDataManager {

    static myInstance = null;

    _user = null;
    _profile = null;
    _onChatScreen = false;
    _onMapScreen = false;

    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }

        return this.myInstance;
    }


    // Getter Setter of USER

    getUser() {
        return this._user;
    }

    setUser(res) {
        this._user = res;
    }

    // Getter Setter of PROFILE

    getProfile() {
        return this._profile;
    }

    setProfile(res) {
        this._profile= res;
    }


    // Getter Setter of ON CHAT SCREEN

    getOnChatScreen() {
        return this._onChatScreen;
    }

    setOnChatScreen(res) {
        this._onChatScreen= res;
    }

    // Getter Setter of ON MAP SCREEN

    getOnMapScreen() {
        return this._onMapScreen;
    }

    setOnMapScreen(res) {
        this._onMapScreen= res;
    }



}
