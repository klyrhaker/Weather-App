import styles from "./Skeleton.module.css";

function Skeleton({ count }: { count: number }) {
  return (
    <div
      className={styles.skeletonDays}
      role="status"
      aria-label="loading"
    >
      {Array.from(
        {
          length: count,
        },
        (_, i) => (
          <div
            key={i}
            data-testid={`skeleton-day-${i}`}
            className={styles.skeletonDay}
          >
            <div className={styles.skeletonDatetime}></div>
            <div className={styles.skeletonConditions}></div>
            <div className={styles.skeletonIcon}></div>
            <div className={styles.skeletonTemp}></div>
            <div className={styles.skeletonFeelslike}></div>
          </div>
        ),
      )}
    </div>
  );
}
export default Skeleton;
