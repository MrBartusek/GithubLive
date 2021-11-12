enum EventType {
    COMMIT_COMMENT = "Commit Comment", 
    CREATE_TAG = "Create Tag",
    CREATE_BRACH = "Create Branch",
    CREATE_REPO = "Create Repository",
    DELETE_TAG = "Delete Tag",
    DELETE_BRACH = "Delete Branch",
    DELETE_REPO = "Delete Repository",
    FORK_REPO = "Fork",
    STAR_REPO = "Star",
    PUSH = "Push",
    ISSUE = "Issue",
    ISSUE_COMMENT = "Issue Comment",
    PR = "Pull Request",
    PR_REVIEW = "Pull Request Review",
    PR_REVIEW_COMMENT = "Pull Request Review Comment",
    PUBLIC = "Public",
    RELEASE = "Release",
    OTHER = "Other"
}

export default EventType