---
layout: post
title: How to shard Cypress specs on GitHub Actions
date: 2024-11-28 22:58:26
excerpt: How to shard Cypress specs on GitHub Actions.
categories: cypress specs github actions ci
---

This post goes over how to shard [Cypress](https://www.cypress.io/) specs on [GitHub Actions](https://github.com/features/actions):

- [Parallel](#parallel)
- [Shard](#shard)

## Parallel

If you have a [Cypress Cloud](https://www.cypress.io/cloud) account, you can spin multiple containers running in [parallel](https://github.com/cypress-io/github-action#parallel) using `strategy: matrix`:

{% raw %}

```yml
# .github/workflows/cypress.yml
name: Parallel Cypress Tests
on: push

jobs:
  test:
    name: Cypress run
    runs-on: ubuntu-latest
    strategy:
      # when one test fails, DO NOT cancel the other
      # containers, because this will kill Cypress processes
      # leaving Cypress Cloud hanging ...
      # https://github.com/cypress-io/github-action/issues/48
      fail-fast: false
      matrix:
        # run 3 copies of the current job in parallel
        containers: [1, 2, 3]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      # because of "record" and "parallel" parameters
      # these containers will load balance all found tests among themselves
      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          record: true
          parallel: true
          group: 'Actions example'
        env:
          # pass the Cypress Cloud record key as an environment variable
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          # Recommended: pass the GitHub token lets this action correctly
          # determine the unique run id necessary to re-run the checks
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

{% endraw %}

See the [Cypress docs](https://docs.cypress.io/app/continuous-integration/github-actions#Parallelization) for more information on parallelization.

## Shard

You can shard the Cypress specs yourself using Bash in GitHub Actions:

{% raw %}

```yml
# .github/workflows/cypress.yml
name: Shard Cypress Tests
on: push

jobs:
  cypress:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        # shard is zero-based since we're using the `split` command
        shard: [0, 1, 2]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Split specs
        id: specs
        run: |
          # find and save all spec paths to a file
          SPECS=specs.txt
          find cypress/e2e -type f -name '*.cy.*' > $SPECS

          # count the total number of spec files
          SPECS_COUNT=$(wc -l < $SPECS)

          # calculate the number of lines to split (rounded up)
          LINES=$(( ($SPECS_COUNT + 1) / ${{ strategy.job-total }} ))

          # split the spec files
          split -d -l $LINES $SPECS spec

          # save the current shard of spec files to an output parameter
          echo "SPECS<<EOF" >> $GITHUB_OUTPUT
          cat spec0${{ matrix.shard }} >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          browser: chrome
          spec: |
            # pass specs from the previous step
            ${{ steps.specs.outputs.SPECS }}
```

{% endraw %}

You can see that the Cypress specs were split into 3 shards and passed into the [GitHub Action](https://github.com/cypress-io/github-action#specs) via an [output parameter](https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/workflow-commands-for-github-actions#setting-an-output-parameter). Alternatively, you can store the specs in an [environment variable](https://docs.github.com/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables).

See example [remarkablemark/cypress-cucumber-steps#979](https://github.com/remarkablemark/cypress-cucumber-steps/pull/979).
