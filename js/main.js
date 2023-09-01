//개발자 도구 - console 에 Ready...라고 뜬다면 정상적으로 연결된 것!!
$(document).ready(function(){
  //console.log('Ready...')
  $('#searchUser').on('keyup',function(e){
    let username = e.target.value;
    console.log(username);

    // Make request to Github
    $.ajax({
      url:'https://api.github.com/users/'+username,
      header:{
        Authorization:"개인 토큰 넣기 (Github - Settings - Developer settings - Personal Access Tokens"
      },
      data:{
        client_id:'', //만약 local ip 호출 횟수가 40번 이상이 되면 막힐 수 있음 -> Authorization 쓰면 나머지 여기 두줄 지워주세요!
        client_secret:'', //그러면 client부분 지우고 앞에 header 주석 지운 뒤에 Authorization에 개인 access 토큰 넣기.
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        // header:{
        //   Authorization: "개인 토큰 넣기(위에와 같은 거)"
        // },
        data:{
          client_id:'', //만약 local ip 호출 횟수가 40번 이상이 되면 막힐 수 있음 -> Authorization 쓰면 나머지 여기 두줄 지워주세요!
          client_secret:'', //그러면 client부분 지우고 앞에 header 주석 지운 뒤에 Authorization에 개인 access 토큰 넣기.
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well">
              <div class="row row-repo">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge text-bg-dark">Forks: ${repo.forks_count} </span>
                  <span class="badge text-bg-gists">Watchers: ${repo.watchers_count} </span>
                  <span class="badge text-bg-success">Stars: ${repo.stargazers_count} </span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
      <div class="card">
        <h4 class="card-header">${user.name}</h4>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <img class="thumbnail avatar" src="${user.avatar_url}"/>
              <a target="_blank" class="btn btn-lg btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
            <span class="badge text-bg-repos">Public Repos: ${user.public_repos}</span>
            <span class="badge text-bg-gists">Public Gists: ${user.public_gists}</span>
            <span class="badge text-bg-success">Followers: ${user.followers}</span>
            <span class="badge text-bg-info">Followings: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company:  ${user.company}</li>
              <li class="list-group-item">Website/blog:  ${user.blog}</li>
              <li class="list-group-item">Location:  ${user.location}</li>
              <li class="list-group-item">Memger Since:  ${user.created_at}</li>
            </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="git-chart">
        <h3> Contribution Chart </h3>
        <img src="https://ghchart.rshah.org/${user.login}" />
      </div>
      <h3 class="page-header">Latest Repos</h3>
      <hr>
      <div id="repos"></div>
      `);
    });
  });
});
