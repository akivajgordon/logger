# logger

## Description

This is my opinionated logger. The main opinion here is a hardcoded "tag" that prefixes each log message. The tag is intended to be **hardcoded** and **unique** across the codebase. This enables finding where a log message came from by simply searching the codebase for the tag.

I set my editor to generate a log line for me and automatically create a random 8-digit string as the tag. This makes it almost effortless to comply with the intention of the tag. 

## Install

```
npm install @akivajgordon/logger
```

## Usage

```typescript
import logger from '@akivajgordon/logger'

logger.info('c8f18d56', 'Hello, world!')
```

Now when I see this log output, it will include the tag. I can search my codebase for that tag and I'll be likely to find the exact origin of the message.
