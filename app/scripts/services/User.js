(function() {
    function User($cookies) {
        var User = {};
        
        User.getUser = function() {
            User.id = $cookies.get('user_id');
            return User.id;
        };
        
        
        User.setUser = function(userName) {
            $cookies.put('user_id', userName);
        };
        
        return User;
    }

    angular
        .module('blocChat')
        .factory('User', ['$cookies', User]);
})();