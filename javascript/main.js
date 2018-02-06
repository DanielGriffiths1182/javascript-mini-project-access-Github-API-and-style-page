$(document).ready(function() {

    // API request
    $.getJSON( 'https://api.github.com/repos/angular/angular/commits', function(data) {
        for (var i = 0; i< 25; i++) {

            // Retrieving data from Github API
            var sha = data[i].sha
            var avatar_url = data[i].author.avatar_url
            var login = data[i].author.login
            var name = data[i].commit.author.name
            var date = data[i].commit.author.date

            // Deriving difference between dates NOTE not ideal, would need a little more time to refactor and consider months
            var dateLimit = 10;
            var trimmedDate = date.substring(0, dateLimit)
            let today = new Date();
            var todayDate = new Date(today);
            var commitDate = new Date(trimmedDate);
            var timeDiff = Math.abs(commitDate.getTime() - todayDate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            // Limiting "commit message" to 50 characters for spacial reasons
            var message = data[i].commit.message
            var length = 50;
            var trimmedMessage = message.substring(0, length) + ". . .";

            // Appending HTML to ID in .html file
            $("#repoList").append(
                "<div class=repo-row>" +
                    "<img src='"+`${avatar_url}`+"'>" +
                    "<li class='repo-info'>" +
                        "<ul class='repo-header-message'>" + trimmedMessage + "</ul>" +
                        "<ul class='repo-user-name'>" + login + " Commited " + diffDays + " days ago<i class='fa fa-check'></i></ul>" +
                        "<ul class='repo-commit-number'>commit: " + sha + "</ul>" +
                    "</li>" +
                "</div>"
            );
        }
    })

    // On button ID click run a reload, run time is fine since only component on view is Repo List
    $('#refreshRepoList').click(function(){
        location.reload();
    });
 })
