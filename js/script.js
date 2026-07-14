const overview = document.querySelector(".overview");
const username = "marko12345git";
const repoList = document.querySelector(".repo-list");

const gitUserInfo = async function () {
  fetchURL = `https://api.github.com/users/${username}`;
  const response = await fetch(fetchURL);
  const data = await response.json();

  console.log(data);

  displayUserInfo(data);
};

gitUserInfo();

const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");

  div.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div>`;

  overview.append(div);
  gitRepos();
};

const gitRepos = async function () {
  reposURL = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
  const fetched = await fetch(reposURL);
  const repoData = await fetched.json();
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  for (let repo of repos) {
    const listElement = document.createElement("li");
    listElement.classList.add("repo");
    listElement.innerHTML = `<h2>${repo.name}</h2>`;
    repoList.append(listElement);
  }
};
