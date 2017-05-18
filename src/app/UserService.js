class UserService {
    constructor($log, $http) {
        this.$log = $log;
        this.$http = $http;
    }

    getSavedUsers() {
        let users = this.$http.get('http://localhost:5000/tasks');
        users.then(function (response) {
            console.log(response);
            return response;
        }).catch(function (ex) {
            console.log('Exception is ::::  ', ex);
        });
        return users
    }

    saveUser(user) {
        let self = this;
        console.log(" coming in Click Handler ", user);
        if (user.id) {
            let url = 'http://localhost:5000/tasks/' + user.id;
            let modifyUser = this.$http.put(url, user);
            modifyUser.then(function (response) {
                console.log(response);
                return response;
            }).catch(function (ex) {
                console.log('parsing failed: ', ex)
            });
            return modifyUser;
        }
        else {
            let savedUser = this.$http.post('http://localhost:5000/tasks', user);
            savedUser.then(function (response) {
                console.log(response);
                return response;
            }).catch(function (ex) {
                console.log('parsing failed: ', ex)
            });
            return savedUser;
        }
    }

    deleteUser(id) {
        let self = this;
        console.log("Selected User Id is ", id);
        let url = 'http://localhost:5000/tasks/' + id;
        let deleteUser = this.$http.delete(url);
        deleteUser.then(function (response) {
            console.log(response);
            return response;
            //self.getSavedUsers();
        }).catch(function (ex) {
            console.log('parsing failed: ', ex)
        });
        return deleteUser;
    }
}
UserService.$inject = ['$log', '$http'];
export default UserService;