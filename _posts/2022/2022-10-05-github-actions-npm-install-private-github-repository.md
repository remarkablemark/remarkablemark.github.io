---
layout: post
title: 'GitHub Actions: npm install private repository'
date: 2022-10-05 18:56:14
excerpt: How to install a private GitHub repository with npm or Yarn in GitHub Actions.
categories: github actions npm repository token
---

If you're installing a private GitHub repository with npm/Yarn in [GitHub Actions](https://github.com/features/actions), then you'll need to set up a [personal access token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

For example, with the following `package.json`:

```json
{
  "dependencies": {
    "mypackage": "https://github.com/my-username/my-private-package"
  }
}
```

[Create a personal access token (PAT)](https://github.com/settings/tokens/new?scopes=repo) and add it as a new repository secret to your repository's **Settings** > **Secrets** > **Actions**.

> In the example, the secret is named `PAT`.

Add the checkout and git config steps before installing the dependencies in your workflow:

{% raw %}

```yml
# .github/workflows/my-workflow.yml
steps:
  - name: Checkout repository
    uses: actions/checkout@v3
    with:
      token: ${{ secrets.PAT }}

  - name: Configure Git
    run: git config --global --add url."https://${{ secrets.PAT }}@github.com/".insteadOf "https://github.com/"

  - name: Install dependencies
    run: npm ci # or `yarn --frozen-lockfile`
```

{% endraw %}

Now you won't get the errors during the install step:

```
fatal: could not read Username for 'https://github.com': terminal prompts disabled
```

```
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
```
