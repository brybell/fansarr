# Fansarr - Fork of Stasharr

## 🍴 Fork Information

**Fansarr** is a fork of [Stasharr](https://github.com/enymawse/stasharr) created to adapt the excellent Stasharr functionality for use with [FansDB](https://fansdb.cc) instead of StashDB.

### Original Project

- **Original Author**: [enymawse](https://github.com/enymawse)
- **Original Repository**: https://github.com/enymawse/stasharr
- **License**: GNU General Public License v3.0

### What This Fork Changes

#### Target Platform

- **Original**: StashDB (stashdb.org)
- **Fork**: FansDB (fansdb.cc)

#### Technical Changes

1. **API Endpoint**: Changed from `https://stashdb.org/graphql` to `https://fansdb.cc/graphql`
2. **Authentication**: Updated cookie handling from `stashbox` to `fansbox`
3. **Metadata Handling**: Added `MetadataTransformer` to handle differences between FansDB and StashDB data structures
4. **Scene Validation**: Enhanced validation for FansDB-specific scene data
5. **Branding**: Updated all UI elements from "Stasharr" to "Fansarr"

#### New Features

- **MetadataTransformer**: Handles transformation of FansDB scene data to Whisparr-compatible format
- **Enhanced Validation**: Specific validation for FansDB data structure differences
- **FansDB Integration**: Full compatibility with FansDB's authentication and API patterns

### Why This Fork Exists

FansDB and StashDB serve similar purposes but have different:

- API endpoints and authentication mechanisms
- Data structures and field naming conventions
- Scene metadata formats

This fork maintains all the powerful functionality of Stasharr while adapting it to work seamlessly with FansDB.

### Credit

All core functionality, architecture, and implementation credit goes to **enymawse** and the original Stasharr contributors. This fork simply adapts their excellent work for a different platform.

### License

This fork maintains the same GNU General Public License v3.0 as the original project.

### Contributing

When contributing to this fork:

- Please respect the original project's licensing and attribution
- Consider whether changes might benefit the original Stasharr project as well
- Clearly distinguish between FansDB-specific and general improvements

### Future

The goal is to maintain feature parity with Stasharr while ensuring FansDB compatibility. As Stasharr evolves, this fork will incorporate relevant changes while maintaining FansDB support.
