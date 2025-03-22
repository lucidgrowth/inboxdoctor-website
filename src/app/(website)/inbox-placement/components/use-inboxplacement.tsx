import { getGetPlacementAccounts, getPlacementReportStatus, getPlacementSubmit } from "@/services";
import { PlacementType } from "@/types/inbox-placement.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPlacementAccounts = ({
  type,
  enabled,
}: {
  type: PlacementType;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["placement-accounts", type],
    queryFn: () => getGetPlacementAccounts({ type }),
    enabled: !!type && !!enabled,
    refetchOnWindowFocus: false,
  });
};

export const usePlacementSubmit = () => {
  return useMutation({
    mutationFn: ({
      senderEmail,
      recipientType,
      testEmails,
    }: {
      senderEmail: string;
      recipientType: string;
      testEmails: string[];
      }) => getPlacementSubmit({ senderEmail, recipientType, testEmails }),
  
  });
};

export const usePlacementReportStatus = ({
  testId,
  enabled,
}: {
  testId: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["placement-report-status", testId],
    queryFn: () => getPlacementReportStatus({ testId }),
    refetchInterval: 60000, // 1 minute
    // refetchInterval: 30000, // 30 seconds
    enabled: !!testId && !!enabled,
    retry: false,
  });
};

// let attemptCount = 0;

// const testIdMap = new Map<string, boolean>([
//   ["test_123", true],
// ]);

// export const getSuccessOnAttempt = async ({
//   testId,
// }: {
//   testId: string;
// }) => {
//   const result: { status: boolean } = await new Promise((resolve) => {
//     if (testIdMap.get(testId)) {
//       resolve({ status: true });
//       return;
//     }

//     attemptCount++;
//     if (attemptCount === 2) {
//       resolve({ status: true });
//       testIdMap.set(testId, true);
//       attemptCount = 0; // reset for next use
//     } else {
//       resolve({ status: false });
//     }
//   });

//   return result;
// };

// const mockPlacementSubmit = async ({
//   senderEmail,
//   recipientType,
//   testEmails,
// }: {
//   senderEmail: string;
//   recipientType: string;
//   testEmails: string[];
// }): Promise<{
//   testId: string;
//   success: boolean;
//   message: string;
// }> => {
//   return new Promise((resolve) =>
//     setTimeout(
//       () =>
//         resolve({
//           testId: "test_123",
//           success: true,
//           message: "Test submitted successfully",
//         }),
//       3000
//     )
//   );
// };
