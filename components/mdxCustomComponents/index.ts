import AnimateHeightWithGrid from './AnimateHeightWithGrid';
import * as ContentCredit from './ContentCredit';
import DimNonHoveredElements from './DimNonHoveredElements';
import LastUpdated from './LastUpdated';
import Link from './Link';
import NeonText from './NeonText';
import Table from './Table';

export const components = {
  a: Link,
  table: Table,
  AnimateHeightWithGrid,
  DimNonHoveredElements,
  LastUpdated,
  NeonText,
  // COURSES AND DOCS
  ...ContentCredit,
};
