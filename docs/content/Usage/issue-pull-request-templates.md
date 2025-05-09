---
date: "2018-05-10T16:00:00+02:00"
title: "Issue and Pull Request templates"
slug: "issue-pull-request-templates"
sidebar_position: 15
toc: false
draft: false
aliases:
  - /en-us/issue-pull-request-templates
menu:
  sidebar:
    parent: "usage"
    name: "Issue and Pull Request templates"
    sidebar_position: 15
    identifier: "issue-pull-request-templates"
---

# Issue and Pull Request Templates

Some projects have a standard list of questions that users need to answer
when creating an issue or pull request. RIA Hub supports adding templates to the
**default branch of the repository** so that they can autopopulate the form when users are
creating issues and pull requests. This will cut down on the initial back and forth
of getting some clarifying details.
It is currently not possible to provide generic issue/pull-request templates globally.

Additionally, the New Issue page URL can be suffixed with `?title=Issue+Title&body=Issue+Text` and the form will be populated with those strings. Those strings will be used instead of the template if there is one.

## File names

Possible file names for issue templates:

- `ISSUE_TEMPLATE.md`
- `ISSUE_TEMPLATE.yaml`
- `ISSUE_TEMPLATE.yml`
- `issue_template.md`
- `issue_template.yaml`
- `issue_template.yml`
- `.gitea/ISSUE_TEMPLATE.md`
- `.gitea/ISSUE_TEMPLATE.yaml`
- `.gitea/ISSUE_TEMPLATE.yml`
- `.gitea/issue_template.md`
- `.gitea/issue_template.yaml`
- `.gitea/issue_template.yml`
- `.github/ISSUE_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE.yaml`
- `.github/ISSUE_TEMPLATE.yml`
- `.github/issue_template.md`
- `.github/issue_template.yaml`
- `.github/issue_template.yml`

Possible file names for issue config:

- `.gitea/ISSUE_TEMPLATE/config.yaml`
- `.gitea/ISSUE_TEMPLATE/config.yml`
- `.gitea/issue_template/config.yaml`
- `.gitea/issue_template/config.yml`
- `.github/ISSUE_TEMPLATE/config.yaml`
- `.github/ISSUE_TEMPLATE/config.yml`
- `.github/issue_template/config.yaml`
- `.github/issue_template/config.yml`

Possible file names for PR templates:

- `PULL_REQUEST_TEMPLATE.md`
- `PULL_REQUEST_TEMPLATE.yaml`
- `PULL_REQUEST_TEMPLATE.yml`
- `pull_request_template.md`
- `pull_request_template.yaml`
- `pull_request_template.yml`
- `.gitea/PULL_REQUEST_TEMPLATE.md`
- `.gitea/PULL_REQUEST_TEMPLATE.yaml`
- `.gitea/PULL_REQUEST_TEMPLATE.yml`
- `.gitea/pull_request_template.md`
- `.gitea/pull_request_template.yaml`
- `.gitea/pull_request_template.yml`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/PULL_REQUEST_TEMPLATE.yaml`
- `.github/PULL_REQUEST_TEMPLATE.yml`
- `.github/pull_request_template.md`
- `.github/pull_request_template.yaml`
- `.github/pull_request_template.yml`

## Directory names

Alternatively, users can create multiple issue templates inside a special directory and allow users to choose one that more specifically
addresses their problem.

Possible directory names for issue templates:

- `ISSUE_TEMPLATE`
- `issue_template`
- `.gitea/ISSUE_TEMPLATE`
- `.gitea/issue_template`
- `.github/ISSUE_TEMPLATE`
- `.github/issue_template`
- `.gitlab/ISSUE_TEMPLATE`
- `.gitlab/issue_template`

Inside the directory can be multiple markdown (`.md`) or yaml (`.yaml`/`.yml`) issue templates of the form.

## Syntax for markdown template

```md
---

name: "Template Name"
about: "This template is for testing!"
title: "[TEST] "
ref: "main"
labels:

- bug
- "help needed"

---

This is the template!
```

In the above example, when a user is presented with the list of issues they can submit, this would show as `Template Name` with the description
`This template is for testing!`. When submitting an issue with the above example, the issue title would be pre-populated with
`[TEST] ` while the issue body would be pre-populated with `This is the template!`. The issue would also be assigned two labels,
`bug` and `help needed`, and the issue will have a reference to `main`.

## Syntax for yaml template

This example YAML configuration file defines an issue form using several inputs to report a bug.

```yaml
name: Bug Report
about: File a bug report
title: "[Bug]: "
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!
  # some markdown that will only be visible once the issue has been created
  - type: markdown
    attributes:
      value: |
        This issue was created by an issue **template** :)
    visible: [content]
  - type: input
    id: contact
    attributes:
      label: Contact Details
      description: How can we get in touch with you if we need more info?
      placeholder: ex. email@example.com
    validations:
      required: false
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: Also tell us, what did you expect to happen?
      placeholder: Tell us what you see!
      value: "A bug happened!"
    validations:
      required: true
  - type: dropdown
    id: version
    attributes:
      label: Version
      description: What version of our software are you running?
      options:
        - 1.0.2 (Default)
        - 1.0.3 (Edge)
    validations:
      required: true
  - type: dropdown
    id: browsers
    attributes:
      label: What browsers are you seeing the problem on?
      multiple: true
      options:
        - Firefox
        - Chrome
        - Safari
        - Microsoft Edge
  - type: textarea
    id: logs
    attributes:
      label: Relevant log output
      description: Please copy and paste any relevant log output. This will be automatically formatted into code, so no need for backticks.
      render: shell
  - type: checkboxes
    id: terms
    attributes:
      label: Code of Conduct
      description: By submitting this issue, you agree to follow our [Code of Conduct](https://example.com)
      options:
        - label: I agree to follow this project's Code of Conduct
          required: true
        - label: I have also read the CONTRIBUTION.MD
          required: true
          visible: [form]
        - label: This is a TODO only visible after issue creation
          visible: [content]
```

### Markdown

You can use a `markdown` element to display Markdown in your form that provides extra context to the user, but is not submitted by default.

Attributes:

| Key   | Description                                                  | Required | Type   | Default | Valid values |
|-------|--------------------------------------------------------------|----------|--------|---------|--------------|
| value | The text that is rendered. Markdown formatting is supported. | Required | String | -       | -            |

visible: Default is **[form]**

### Textarea

You can use a `textarea` element to add a multi-line text field to your form. Contributors can also attach files in `textarea` fields.

Attributes:

| Key         | Description                                                                                                                                                                   | Required | Type   | Default      | Valid values              |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|--------|--------------|---------------------------|
| label       | A brief description of the expected user input, which is also displayed in the form.                                                                                          | Required | String | -            | -                         |
| description | A description of the text area to provide context or guidance, which is displayed in the form.                                                                                | Optional | String | Empty String | -                         |
| placeholder | A semi-opaque placeholder that renders in the text area when empty.                                                                                                           | Optional | String | Empty String | -                         |
| value       | Text that is pre-filled in the text area.                                                                                                                                     | Optional | String | -            | -                         |
| render      | If a value is provided, submitted text will be formatted into a codeblock. When this key is provided, the text area will not expand for file attachments or Markdown editing. | Optional | String | -            | Languages known to RIA Hub. |

Validations:

| Key      | Description                                          | Required | Type    | Default | Valid values |
|----------|------------------------------------------------------|----------|---------|---------|--------------|
| required | Prevents form submission until element is completed. | Optional | Boolean | false   | -            |

visible: Default is **[form, content]**

### Input

You can use an `input` element to add a single-line text field to your form.

Attributes:

| Key         | Description                                                                                | Required | Type   | Default      | Valid values |
|-------------|--------------------------------------------------------------------------------------------|----------|--------|--------------|--------------|
| label       | A brief description of the expected user input, which is also displayed in the form.       | Required | String | -            | -            |
| description | A description of the field to provide context or guidance, which is displayed in the form. | Optional | String | Empty String | -            |
| placeholder | A semi-transparent placeholder that renders in the field when empty.                       | Optional | String | Empty String | -            |
| value       | Text that is pre-filled in the field.                                                      | Optional | String | -            | -            |

Validations:

| Key       | Description                                                                                      | Required | Type    | Default | Valid values                                                             |
|-----------|--------------------------------------------------------------------------------------------------|----------|---------|---------|--------------------------------------------------------------------------|
| required  | Prevents form submission until element is completed.                                             | Optional | Boolean | false   | -                                                                        |
| is_number | Prevents form submission until element is filled with a number.                                  | Optional | Boolean | false   | -                                                                        |
| regex     | Prevents form submission until element is filled with a value that match the regular expression. | Optional | String  | -       | a [regular expression](https://en.wikipedia.org/wiki/Regular_expression) |

visible: Default is **[form, content]**

### Dropdown

You can use a `dropdown` element to add a dropdown menu in your form.

Attributes:

| Key         | Description                                                                                         | Required | Type         | Default      | Valid values |
|-------------|-----------------------------------------------------------------------------------------------------|----------|--------------|--------------|--------------|
| label       | A brief description of the expected user input, which is displayed in the form.                     | Required | String       | -            | -            |
| description | A description of the dropdown to provide extra context or guidance, which is displayed in the form. | Optional | String       | Empty String | -            |
| multiple    | Determines if the user can select more than one option.                                             | Optional | Boolean      | false        | -            |
| options     | An array of options the user can choose from. Cannot be empty and all choices must be distinct.     | Required | String array | -            | -            |

Validations:

| Key      | Description                                          | Required | Type    | Default | Valid values |
|----------|------------------------------------------------------|----------|---------|---------|--------------|
| required | Prevents form submission until element is completed. | Optional | Boolean | false   | -            |

visible: Default is **[form, content]**

### Checkboxes

You can use the `checkboxes` element to add a set of checkboxes to your form.

Attributes:

| Key         | Description                                                                                           | Required | Type   | Default      | Valid values |
| ----------- | ----------------------------------------------------------------------------------------------------- | -------- | ------ | ------------ | ------------ |
| label       | A brief description of the expected user input, which is displayed in the form.                       | Required | String | -            | -            |
| description | A description of the set of checkboxes, which is displayed in the form. Supports Markdown formatting. | Optional | String | Empty String | -            |
| options     | An array of checkboxes that the user can select. For syntax, see below.                               | Required | Array  | -            | -            |

For each value in the options array, you can set the following keys.

| Key          | Description                                                                                                                              | Required | Type         | Default | Options |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------|----------|--------------|---------|---------|
| label        | The identifier for the option, which is displayed in the form. Markdown is supported for bold or italic text formatting, and hyperlinks. | Required | String       | -       | -       |
| required     | Prevents form submission until element is completed.                                                                                     | Optional | Boolean      | false   | -       |
| visible      | Whether a specific checkbox appears in the form only, in the created issue only, or both. Valid options are "form" and "content".        | Optional | String array | false   | -       |

visible: Default is **[form, content]**

## Syntax for issue config

This is a example for a issue config file

```yaml
blank_issues_enabled: true
contact_links:
  - name: RIA Hub
    url: https://gitea.io
    about: Visit the RIA Hub Website
```

### Possible Options

| Key                  | Description                                           | Type               | Default     |
|----------------------|-------------------------------------------------------|--------------------|-------------|
| blank_issues_enabled | If set to false, the User is forced to use a Template | Boolean            | true        |
| contact_links        | Custom Links to show in the Choose Box                | Contact Link Array | Empty Array |

### Contact Link

| Key   | Description                      | Type   | Required |
|-------|----------------------------------|--------|----------|
| name  | the name of your link            | String | true     |
| url   | The URL of your Link             | String | true     |
| about | A short description of your Link | String | true     |
