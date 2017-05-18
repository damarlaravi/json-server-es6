import angular from 'angular';
import UserService from './UserService';
//import '../style/app.css';
import '../style/bootstrap.css';

let app = () => {
    return {
        scope: {
            user: '<'
        },
        template: require('./app.html'),
        controller: 'AppCtrl',
        controllerAs: 'app'
    }
};

class AppCtrl {
    constructor($log, userService) {
        this.$log = $log;
        this.userService = userService;
        this.user = {};
        this.savedUsers = [];
        this.getUsers();
    }

    getUsers() {
        let self = this;
        let savedUsers = this.userService.getSavedUsers();
        savedUsers.then((res) => {
            self.savedUsers = res.data;
            this.$log.log(self.savedUsers);
        }).catch((err) => {
            this.$log.log(err.data);
        });
    }

    saveUser() {
        let self = this;
        let user = this.userService.saveUser(this.user);
        user.then(() => {
            self.getUsers();
        }).catch((err) => {
            this.$log.log(err.data);
        });

        //this.$log.log("saved User is    ",this.user);
    }

    modifyUser(user) {
        this.$log.log("saved User is    ", user);
        this.user = JSON.parse(JSON.stringify(user));
    }

    deleteUser(id) {
        let self = this;
        let deleteUser = this.userService.deleteUser(id);
        deleteUser.then(() => {
            self.getUsers();
        }).catch((ex) => {
            this.$log.log("Exception is    ", ex);
        })
    }
}
AppCtrl.$inject = ['$log', 'userService'];

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
    .directive('app', app)
    .service('userService', UserService)
    .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;