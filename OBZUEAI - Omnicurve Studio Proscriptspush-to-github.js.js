const { simpleGit } = require('simple-git');
const path = require('path');

const git = simpleGit(path.join(__dirname, '..'));

async function pushToGitHub() {
  const repoUrl = 'https://github.com/obzue/obzueai-omnicurve.git';
  const commitMessage = 'Release full-stack OBZUEAI Omnicurve Studio Pro platform';

  try {
    console.log('Initializing Git repository...');
    await git.init();

    console.log('Staging files...');
    await git.add('./*');

    console.log('Creating commit...');
    await git.commit(commitMessage);

    console.log('Setting main branch...');
    await git.branch(['-M', 'main']);

    const remotes = await git.getRemotes();
    const originExists = remotes.some((r) => r.name === 'origin');

    if (originExists) {
      await git.remote(['set-url', 'origin', repoUrl]);
    } else {
      await git.addRemote('origin', repoUrl);
    }

    console.log('Pushing to GitHub...');
    await git.push(['-u', 'origin', 'main', '--force']);
    console.log('Successfully pushed OBZUEAI Omnicurve Studio Pro!');
  } catch (err) {
    console.error('Push failed:', err);
  }
}

pushToGitHub();