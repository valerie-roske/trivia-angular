var triviaControllers = angular.module('triviaControllers', ['firebase', 'triviaServices']);

triviaControllers.controller('QuestionListCtrl', ['$scope', 'FirebaseService', function($scope, FirebaseService) {
    $scope.questions = FirebaseService.getQuestions();

    $scope.answerQuestion = function(question, selectedAnswer) {
        question.answered = true;
        question.correct = (question.answer === selectedAnswer);
    };

    $scope.deleteQuestion = function(questionId) {
        $scope.questions.$remove(questionId);
    };
}]);

triviaControllers.controller('QuestionNewCtrl', ['$scope', 'FirebaseService', '$location',
    function($scope, FirebaseService, $location) {
        $scope.question = {};

        $scope.persistQuestion = function(question) {
            $scope.questions = FirebaseService.getQuestions();

            $scope.questions.$add(question).then(function(ref) {
                $location.url('/questions');
            });
        };
    }]);

triviaControllers.controller('QuestionDetailCtrl', ['$scope', 'FirebaseService', '$routeParams', '$location',
    function($scope, FirebaseService, $routeParams, $location) {

        $scope.question = FirebaseService.getQuestion($routeParams.questionId);

        $scope.persistQuestion = function(question) {
            $scope.question.$update({
                question: question.question,
                option1: question.option1,
                option2: question.option2,
                option3: question.option3,
                option4: question.option4,
                answer: question.answer
            }).then(function(ref) {
                $location.url('/questions');
            });
        };
    }]);